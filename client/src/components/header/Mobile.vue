<template>
  <!--  mobile header-->
  <div class="lg:!hidden !block">
    <div class="flex justify-between items-center !py-1 px-0.7">
      <NavbarMobileMain/>
      <div>
        <NuxtLink  :to="{name:'index'}">
          <nuxt-img src="https://cdn.shopify.com/s/files/1/0272/9548/1943/files/brentoslogo.png?v=1663235427" width="70" alt=""/>
        </NuxtLink>
      </div>
      <NuxtLink :to="{name:'cart'}" class="pr-0.5" >
        <Badge size="lg" class="cursor-pointer text-gray-800" icon="fa-solid fa-cart-shopping" :value="cartLength"/>
      </NuxtLink>
    </div>
    <div class="relative w-[95%] py-1 mx-auto">
      <FormSearch @input="initSearch" class="w-full" v-model="searchText" @on="showResult($event)"/>
      <DarkOverlay z-index="999" @outside="closeResult($event)" :is-fire="searchBoxFlag"/>
      <HeaderSearchResult :is-fire="searchBoxFlag" :search-text="searchText"/>
    </div>
    <div class="flex w-full justify-start gap-1 items-center py-0.8 border-b-[1px] border-t-[1px] border-gray-200 px-0.7">
      <font-awesome-icon icon="fa-solid fa-truck-fast" size="lg" class="text-dark"/>
      <client-only>
        <div class="">
          <span class="text-0.6 block">Free Shipping in Australia</span>
          <span class="font-600 text-0.9  text-dark">Orders Over $70</span>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDesktopHeader} from "~/composables/useHeader";
import {useCartStore} from "~/composables/useStore";
const {searchBoxFlag,showResult,searchText,closeResult,initSearch}=useDesktopHeader()
const {cartLength}=useCartStore()
</script>

<style scoped>

</style>