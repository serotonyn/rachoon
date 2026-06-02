import { chromium } from 'playwright'
import { PDFiumLibrary, PDFiumPageRenderOptions } from '@hyzyla/pdfium'
import { Locale } from '@repo/common'
import { Document as CommonDocument } from '@repo/common'
import Template from 'App/Models/Template'
import User from 'App/Models/User'
import sharp from 'sharp'
import nunjucks from 'nunjucks'
import { Format } from '@repo/common'

export default class Renderer {
  private static async renderFunction(
    options: PDFiumPageRenderOptions,
    downScaleFactor: number = 1
  ) {
    return await sharp(options.data, {
      raw: {
        width: options.width,
        height: options.height,
        channels: 4,
      },
    })
      .resize(
        Math.floor(options.width / downScaleFactor),
        Math.floor(options.height / downScaleFactor)
      )
      .png()
      .toBuffer()
  }

  public static prepareHtml(user: User, template: Template, data: any): string {
    const org = user.organization

    const loc = org.settings.general.locale
    const cur = org.settings.general.currency

    const t = (key: string, ...val: any): string => Locale.t(loc, key, val)
    const currency = (value: any): string => Format.toCurrency(value, loc, cur)
    const date = (value: any): string => Format.date(new Date(value), loc)
    const longDate = (value: any): string => Format.longDate(new Date(value), loc)

    const title =
      org.settings[CommonDocument.getTypeString(data.type, true, true)].title

    nunjucks.configure({ autoescape: false })

    return nunjucks.renderString(template.html, {
      document: new CommonDocument(data),
      template,
      organization: org,
      title,
      user,
      t,
      format: {
        currency,
        date,
        longDate,
      },
    })
  }

  private static async htmlToPdf(html: string): Promise<Buffer> {
    const browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    try {
      const page = await browser.newPage()

      await page.setContent(html, {
        waitUntil: 'networkidle',
      })

      const pdfBuffer = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px',
        },
        format: undefined, // respects CSS @page size if present
      })

      return pdfBuffer
    } finally {
      await browser.close()
    }
  }

  public static async generatePDFOrImage(
    html: string,
    isImage: boolean = false,
    downScaleFactor: number = 1
  ): Promise<string[]> {
    const pdfBuffer = await this.htmlToPdf(html)

    if (!isImage) {
      return ['data:application/pdf;base64,' + pdfBuffer.toString('base64')]
    }

    const library = await PDFiumLibrary.init()
    const doc = await library.loadDocument(pdfBuffer)

    const images: string[] = []

    for (const page of doc.pages()) {
      const p = await page.render({
        scale: 3,
        render: (options) => this.renderFunction(options, downScaleFactor),
      })

      images.push(
        'data:image/png;base64,' +
          Buffer.from(p.data).toString('base64')
      )
    }

    return images
  }
}