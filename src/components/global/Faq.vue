<template>
    <div>
      <div :class="{'bg-gray-100/60':isActive}" class="title border-b-[1px] border-gray-300/80  font-700">
        <button @click="isActive=!isActive" class="cursor-pointer px-1 py-1.5 hover:bg-gray-100/60 transition-all text-0.9 text-dark w-full h-full text-left">
          <font-awesome-icon class="mr-0.5" :icon="isActive ? 'fa-minus':'fa-plus'" icon="fa-solid " />
          {{title}}
        </button>
      </div>
      <div :class="{'border-b-[1px] bg-gray-100/60 border-gray-300/80':isActive}" v-collapsible="isActive" class="description v-collapse">
        <p class="first:pt-1 pb-1.5 !text-1 font-500 px-2" v-for="item in description">{{item}}</p>
      </div>
    </div>
</template>

<script setup lang="ts">
let {title,description}=defineProps<{
  title:string
  description:string
}>();
let isActive=ref<boolean>(false)
</script>

<style lang="scss">
@tailwind components;
@layer components {
  .v-collapse:not(.show) {
    @apply hidden;
  }

  .collapsing {
    @apply h-0 overflow-hidden transition-all duration-300 ease-in-out;
  }
}
</style>