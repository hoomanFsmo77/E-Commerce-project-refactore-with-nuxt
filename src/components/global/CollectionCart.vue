<template>
  <div class="collection-card">
    <div class="collection-card-image" :class="{'h-[400px]':isLoading}">
      <Skeletor v-if="isLoading" class="!absolute" width="100%" :shimmer="true" height="400"/>

      <nuxt-img
          @load="imageLoad"
          sizes="(max-width: 467px) calc((100vw - 40px) / 2), (max-width: 1280px) calc((100vw - 100px) / 3), 420px"
          :srcset="srcset"
          :src="src"
          :alt="text"
      />
    </div>
    <div class="collection-card-text">
        <a @click="redirect" class="btn-link btn-stretch !font-500 !text-1 capitalize cursor-pointer" >
          {{text}}
        </a>
    </div>
  </div>
</template>

<script setup lang="ts">
let props=defineProps<{
  link:string
  src:string
  srcset:string
  text:string
}>()
const router=useRouter()
const isLoading=ref<boolean>(true)
const redirect = () => {
  return navigateTo(props.link)
}
const imageLoad = () => {
  isLoading.value=false
}
</script>

<style scoped>

</style>