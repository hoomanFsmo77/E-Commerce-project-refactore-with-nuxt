<template>
  <row class="items-center flex-wrap !my-0 !py-0">
    <column col="9" >
      <ul class="flex gap-1.6 items-center flex-wrap" >
        <NavbarDesktopItem v-for="item in navbarData.navbarItems" :key="item.id" :data="item"/>
      </ul>
    </column>
    <column col="3">
      <div class="flex justify-end gap-1 items-center">
        <font-awesome-icon icon="fa-solid fa-truck-fast" size="2xl" class="text-dark"/>
        <div>
          <span class="text-0.7 ">Free Shipping in Australia</span>
          <br>
          <span class=" text-dark">Orders Over $70</span>
        </div>
      </div>
    </column>
  </row>
</template>

<script lang="ts" setup>
import navbarData from '~/static/data/NavbarData.json'
</script>

<style scoped>

</style>