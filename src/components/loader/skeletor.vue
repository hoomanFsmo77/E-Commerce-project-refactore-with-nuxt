<template>
  <div  class="skelton p-1.5 !pb-1">
    <div class="flex  gap-1 items-center mb-0.7">
      <Skeletor width="50%" :shimmer="true" :height="110"/>
      <div class="w-full flex flex-col gap-0.5">
        <Skeletor width="100%" :shimmer="true" height="50"/>
        <Skeletor width="100%" :shimmer="true" height="50"/>
      </div>
    </div>
    <div class="flex  gap-1 items-center mb-0.7">
      <Skeletor width="50%" :shimmer="true" :height="110"/>
      <div class="w-full flex flex-col gap-0.5">
        <Skeletor width="100%" :shimmer="true" height="50"/>
        <Skeletor width="100%" :shimmer="true" height="50"/>
      </div>
    </div>
    <div class="flex  gap-1 items-center">
      <Skeletor width="50%" :shimmer="true" :height="110"/>
      <div class="w-full flex flex-col gap-0.5">
        <Skeletor width="100%" :shimmer="true" height="50"/>
        <Skeletor width="100%" :shimmer="true" height="50"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/style/components/Skelton.scss'


</script>

<style scoped>

</style>