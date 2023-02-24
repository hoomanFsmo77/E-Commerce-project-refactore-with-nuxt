<template>
  <div class="relative">
    <font-awesome-icon v-bind="$attrs" :size="size" :icon="icon" />
    <span class="block absolute w-1 h-1 top-[-50%] right-[-50%] text-0.7 flex justify-center items-center text-light bg-gray-800 rounded-full">
      {{value}}
    </span>
  </div>
</template>
<script>
export default {
  name: "Badge",
  props:['icon','value','size']
}
</script>

<style scoped>

</style>