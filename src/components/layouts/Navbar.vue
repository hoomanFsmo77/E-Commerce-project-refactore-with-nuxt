<template>
  <nav v-if="windowWidth > 960" class=" border-t-[1px] border-gray-200 border-b-[1px] ">
    <container>
      <NavbarDesktopMain/>
    </container>
  </nav>
</template>

<script setup>
const windowWidth=process.client ? window.innerWidth : null
</script>

<style scoped>

</style>