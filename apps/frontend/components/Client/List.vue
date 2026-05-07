<script setup lang="ts">
const controller = () => useClient();

onMounted(() => {
  controller().list();
  controller().watchSearch();
});

const columns = [
  { label: "# Number", field: "number", class: "", width: "180" },
  { label: "Name", field: "name", class: "" },
  { label: "Offers", field: "totalOffers", class: "hidden md:table-cell" },
  { label: "Invoices", field: "totalInvoices", class: "hidden md:table-cell" },
  { label: "Reminders", field: "totalReminders", class: "hidden md:table-cell" },
  { label: "", field: "actions", class: "text-right" },
];
</script>

<template>
  <Loading v-if="controller().loading" />
  <div v-else>
    <FormHeader title="Clients" icon="fa-user-tie" :divider="false" showSearch v-model="controller().search">
      <template #buttons>
        <NuxtLink class="btn btn-new btn-sm btn-neutral gap-2 no-underline" href="/clients/new">
          <FaIcon icon="fa-solid fa-plus-circle " />
          New client
        </NuxtLink>
      </template>
    </FormHeader>
    <DataTable
      :columns="columns"
      :rows="useClient().items"
      :sortableFields="['number', 'name', 'totalInvoices', 'totalReminders', 'totalOffers']"
      :showLoadMore="controller().hasMore()"
      @doLoadMore="controller().doLoadMore()"
      @sort="(sort) => controller().sort(sort)"
      :loading="controller().refresh || controller().loadMore"
    >
      <template #number="{ row }">
        <NuxtLink :href="`/clients/${row.id}`" class="link">
          {{ row.number }}
        </NuxtLink>
        <br />
        <small class="opacity-50">last modified {{ useFormat.date(row.updatedAt) }}</small>
      </template>

      <template #name="{ row }">
        {{ row.name }}
        <br />
        <small class="opacity-50">{{ row.data.contactPerson?.fullName }}</small>
      </template>

      <template #totalOffers="{ row }">
        <div class="indicator">
          <span v-if="row.pendingOffers > 0" class="indicator-item badge badge-xs badge-error">
            {{ row.pendingOffers }}
          </span>
          <NuxtLink :to="`/offers/client/${row.id}`">{{ row.totalOffers }} Offers</NuxtLink>
        </div>
      </template>

      <template #totalInvoices="{ row }">
        <div class="indicator">
          <span v-if="row.pendingInvoices > 0" class="indicator-item badge badge-xs badge-error">
            {{ row.pendingInvoices }}
          </span>
          <NuxtLink :to="`/invoices/client/${row.id}`">{{ row.totalInvoices }} Invoices</NuxtLink>
        </div>
      </template>

      <template #totalReminders="{ row }">
        <div class="indicator">
          <span v-if="row.pendingReminders > 0" class="indicator-item badge badge-xs badge-error">
            {{ row.pendingReminders }}
          </span>
          <NuxtLink :to="`/reminders/client/${row.id}`">{{ row.totalReminders }} Reminders</NuxtLink>
        </div>
      </template>

      <template #actions="{ row }">
        <ContextMenu>
          <li>
            <NuxtLink :href="`/clients/${row.id}`">
              <FaIcon icon="fa-regular fa-edit" />
              Edit Client
            </NuxtLink>
          </li>

          <li class="mt-2 p-0 disabled">
            <div class="divider m-0 p-0"></div>
          </li>

          <li>
            <label @click="controller().delete(row.id)" class="text-error">
              <FaIcon icon="fa-solid fa-close" />
              Delete
            </label>
          </li>
        </ContextMenu>
      </template>
    </DataTable>
  </div>
</template>
