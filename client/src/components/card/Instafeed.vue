<template>
  <div class="insta-feed-card">
    <div>
      <nuxt-img
          class="insta-feed-img"
          :src="src"
      />
    </div>
    <div class="stretch-link transition-all group hover:bg-dark/60 ">
      <font-awesome-icon class="hidden group-hover:block text-light absolute top-[50%] right-[50%]" size="2xl" icon="fa-brands fa-instagram" />
      <button @click="openModal" class="w-full h-full"></button>

    </div>
  </div>

</template>

<script setup lang="ts">
const emit=defineEmits<{
  (e:'changePost',val:{isOpen:boolean,index:number}):void
}>();
const props=defineProps<{
  src:string
  date:string
  link:string
  content:string
  index:number
}>();
const openModal = () => {
  emit('changePost',{isOpen:true,index:props.index})
}
</script>

<style scoped>

</style>