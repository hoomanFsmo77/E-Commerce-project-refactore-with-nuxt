<template>
  <div class="collection-card">
    <div class="collection-card-image"  :class="{'h-[400px]':isLoading}">
      <Skeletor v-if="isLoading" class="!absolute" width="100%" :shimmer="true" height="400"/>
      <img v-lazy="src"
           :srcset="srcset"
           class="md:h-[380px]"
           sizes="(max-width: 767px) calc(100vw - 20px), (max-width: 1360px) 33vw, 420px"
           @load="imageLoad"
           alt="" />
    </div>
    <div class="collection-card-text">
      <h6 class="">{{subTitle}}</h6>
      <h3 class="font-700 my-0.5">{{title}}</h3>
      <NuxtLink class="btn btn-dark-outline block my-1 w-full !py-0.6"
                :to="link"
      >
        Show more
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props=defineProps<{
  src:string
  srcset:string
  subTitle:string
  title:string
  link:string
}>()
const isLoading=ref<boolean>(true)
const imageLoad = () => {
  isLoading.value=false
}


</script>

<style scoped>

</style>