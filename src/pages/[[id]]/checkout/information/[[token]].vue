<template>
  <NuxtLayout name="checkout">
    {{$route.params.id}}
    {{$route.params.token}}
  </NuxtLayout>

</template>

<script setup lang="ts">
definePageMeta({layout:false,middleware:'checkout'})


</script>

<style scoped>

</style>