<template>
  <!--  desktop header-->
  <row  class="items-center !py-1">
    <column col="6">
      <div>
        <NuxtLink  :to="{name:'index'}">
          <nuxt-img src="https://cdn.shopify.com/s/files/1/0272/9548/1943/files/brentoslogo.png?v=1663235427" width="110" alt="" />
        </NuxtLink>
      </div>
    </column>
    <column col="6" class="flex gap-1 items-center justify-end">
      <div class="w-[65%] relative">
        <FormSearch @input="initSearch" v-model="searchText" @on="showResult($event)"/>
        <DarkOverlay z-index="999" @outside="closeResult($event)" :is-fire="searchBoxFlag"/>
        <HeaderSearchResult :is-fire="searchBoxFlag" :search-text="searchText"/>
      </div>
      <NuxtLink to="/cart" class="btn btn-dark-fill">
        <font-awesome-icon size="lg" icon="fa-solid fa-cart-shopping" />
        <span class="even:hidden">${{totalPrice}} ({{cartLength}})</span>
      </NuxtLink>
    </column>
  </row>

</template>

<script setup lang="ts">
const {closeResult,searchText,showResult,searchBoxFlag,initSearch}=useDesktopHeader()
const {cartLength, totalPrice}=useCartStore()
</script>

