<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Full name
          </span>
        </label>
        <input
          type="text"
          placeholder="Full name"
          v-model="useClient().item.data.contactPerson.fullName"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            E-Mail
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input
          type="email"
          pattern=".+@.+\..+"
          placeholder="mail@example.com"
          v-model="useClient().item.data.contactPerson.email"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
