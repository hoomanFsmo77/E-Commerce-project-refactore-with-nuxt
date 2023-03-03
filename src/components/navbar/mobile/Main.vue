<template>
  <div class="block lg:hidden">
    <font-awesome-icon @click="isOpen=true" size="lg" class="cursor-pointer text-gray-700" icon="fa-solid fa-bars" />
  </div>
  <Transition name="move">
    <div v-if="isOpen" class="fixed transition-all z-[999999] left-0 top-0 h-[100vh] sm:w-[60vw] w-[100vw] bg-light">
      <div class="py-1.5 px-1 flex justify-between items-center">
        <span class="text-0.9 text-dark font-600">Menu</span>
        <font-awesome-icon size="lg" class="cursor-pointer text-gray-700" @click="isOpen=false" icon="fa-solid fa-x" />
      </div>
      <div class="flex w-full justify-start gap-1 items-center py-0.8 border-b-[1px] border-t-[1px] border-gray-200 bg-gray-100 px-0.7">
        <font-awesome-icon icon="fa-solid fa-truck-fast" size="lg" class="text-dark"/>
        <div>
          <span class="text-0.7 block">Free Shipping in Australia</span>
          <span class=" text-0.9  text-dark">Orders Over $70</span>
        </div>
      </div>
      <ul >
        <NavbarMobileItem v-for="lvl1 in navbarData.navbarItems" :key="lvl1.id" :data="lvl1"/>
      </ul>
    </div>
  </Transition>
  <DarkOverlay z-index="99999" @outside="closeMenu($event)" :is-fire="isOpen"/>
</template>

<script setup lang="ts">
const {data:navbarData}=await useFetch('/api/navbar')
import {useMobileHeader} from "~/composables/useHeader";
const {isOpen,closeMenu}=useMobileHeader()
</script>

<style lang="scss" >
.move-enter-active,.move-leave-active{
  transition: all 400ms ease-in-out;
}
.move-enter-from,.move-leave-to{
  left:-1000px
}
.move-enter-to,.move-leave-from{
  left:0
}



</style>