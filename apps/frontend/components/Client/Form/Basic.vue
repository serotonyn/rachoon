<script setup lang="ts">
const controller = () => useClient();
</script>
<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Organization name
            <span class="text-error">*</span>
          </span>
        </label>
        <input
          type="text"
          v-model="controller().item.name"
          placeholder="Organization name"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Name addition</span>
        </label>
        <input
          type="text"
          v-model="controller().item.data.info.addition"
          placeholder=""
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">RC</span>
        </label>
        <input
          type="text"
          placeholder="RC"
          v-model="controller().item.data.info.rc"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">NIF</span>
        </label>
        <input
          type="text"
          placeholder="NIF"
          v-model="controller().item.data.info.nif"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
       <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">NIS</span>
        </label>
        <input
          type="text"
          placeholder="NIS"
          v-model="controller().item.data.info.nis"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">AI</span>
        </label>
        <input
          type="text"
          placeholder="AI"
          v-model="controller().item.data.info.ai"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div> 
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">TIN</span>
        </label>
        <input
          type="text"
          placeholder="TIN"
          v-model="controller().item.data.info.tin"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div> 
    </div>
  </div>
</template>
