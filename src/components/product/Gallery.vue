<template>
  <div  class="relative mr-1">
    <Skeletor v-if="isLoading" class="rounded-8 !absolute z-[9999] top-0 left-0" width="100%" :shimmer="true" height="800"/>
    <font-awesome-icon @click="isActive=true" class="absolute top-0 transition hover:!text-dark right-0 m-1 text-1.5 !text-dark/70 cursor-pointer z-50" icon="fa-solid fa-magnifying-glass-plus " />
    <nuxt-img
        @load="imageLoad"
        class="cursor-grab rounded-8"
        :src="src"
        :srcset="srcset"
        alt=""
        sizes="(max-width: 767px) calc(100vw - 20px), (max-width: 1360px) 50vw, 620px"
    />
    <client-only>
      <ProductZoomer @close="close" :is-active="isActive" :src="zoom"/>
    </client-only>
  </div>

</template>

<script setup lang="ts">
let props=defineProps<{
  src:string
  srcset:string
  zoom:string
}>();
const isActive=ref<boolean>(false)
const isLoading=ref<boolean>(true)
const close = () => {
  isActive.value=false
}
const imageLoad = () => {
  isLoading.value=false
}
</script>

<style lang="scss" >
.vue-skeletor.vue-skeletor--rect.\!absolute.top-0.left-0{
  background-color: #ccc!important;
}
</style>