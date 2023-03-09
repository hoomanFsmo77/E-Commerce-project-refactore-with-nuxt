<template>
  <NuxtLayout>
    <Preloader :show="isLoading"/>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
const {isLoading}=usePreloader()

useHead({
  title:'Brentos – Australian Art by Illustrator and Author Brent Turner'
})
</script>
