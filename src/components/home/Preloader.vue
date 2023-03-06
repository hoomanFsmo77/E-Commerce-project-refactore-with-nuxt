<template>
  <teleport to="body">
    <div v-if="show" class="fixed w-[100vw] h-[100vh] z-[99999] flex justify-center items-center top-0 left-0 bg-light/20">
      <hollow-dots-spinner class="z-50 relative"
                           :animation-duration="1000"
                           :dot-size="50"
                           :dots-num="3"
                           color="#333"
      />
    </div>
  </teleport>
</template>

<script setup>
import { HollowDotsSpinner } from 'epic-spinners'
let props=defineProps(['show'])
</script>

<style scoped>

</style>