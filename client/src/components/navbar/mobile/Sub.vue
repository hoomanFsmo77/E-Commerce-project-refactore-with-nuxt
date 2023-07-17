<template>
  <ul v-collapsible="props.isActive" class="w-full transition-all v-collapse  bg-gray-100">
    <slot/>
  </ul>
</template>

<script setup lang="ts">
let props=defineProps<{
  isActive:boolean
}>()


</script>

<style lang="scss">
@tailwind components;
@layer components {
  .v-collapse:not(.show) {
    @apply hidden;
  }
  .collapsing{
    @apply h-0 overflow-hidden transition-all duration-300 ease-in-out
  }
}


</style>