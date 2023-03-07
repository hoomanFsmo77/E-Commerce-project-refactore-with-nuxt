<template>
  <NuxtLayout>
    <Preloader :show="isLoading"/>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
const {isLoading}=usePreloader()
</script>
