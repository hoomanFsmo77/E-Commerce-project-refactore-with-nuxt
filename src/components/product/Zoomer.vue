<template>
  <teleport to="body">
    <Transition name="fade">
      <div v-if="isActive" id="zoom-area" class="fixed overflow-scroll z-[9999] top-0 left-0 w-[100vw] bg-light h-[100vh]">
        <nuxt-img @load="imageLoad($event)" :src="src" class="relative" alt="" />

        <div class="w-3 h-3 flex justify-center items-center bg-light rounded-full fixed right-0 top-0 m-2">
          <font-awesome-icon @click="close" class="transition hover:!text-dark text-1.5 !text-dark/70 cursor-pointer" icon="fa-solid fa-magnifying-glass-minus" />
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
const props=defineProps<{
  src:string,
  isActive:boolean
}>();


let emit=defineEmits<{
  (e:'close',val:boolean):void
}>();
const close = () => {
  emit('close',false)
  document.body.style.overflowY='scroll'
}
const imageLoad = (e:Event) => {
  const el=e.target as HTMLImageElement
  let cssProps=getComputedStyle(el)
  el.style.width=cssProps.width
  el.style.height=cssProps.height
  document.body.style.overflowY='hidden'
}

</script>

<style lang="scss" scoped>
.fade-enter-active,.fade-leave-active{
  transition: all 300ms linear;
}
.fade-enter-from,.fade-leave-to{
  opacity: 0;
  visibility: hidden;
}
.fade-enter-to,.fade-leave-from{
  opacity: 1;
  visibility: visible;
}

</style>