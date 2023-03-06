<template>
  <nav  class="lg:!block !hidden border-t-[1px] border-gray-200 border-b-[1px] ">
    <container>
      <NavbarDesktopMain/>
    </container>
  </nav>
</template>

<script setup lang="ts">
import {useNavbar} from "~/composables/useNavbar";
useNavbar()
</script>

<style scoped>




</style>