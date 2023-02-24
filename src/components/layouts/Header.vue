<template>
  <header>
    <container v-if="windowWidth > 960" >
      <HeaderDesktop/>
    </container>
    <HeaderMobile v-else/>
  </header>
</template>

<script setup lang="ts">
const windowWidth=process.client ? window.innerWidth :null
</script>

<style scoped>

</style>