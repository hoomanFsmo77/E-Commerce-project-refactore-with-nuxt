<template>
  <div v-if="show" v-bind="$attrs" class="w-full h-[250px] bg-light/20 absolute top-0 left-0 flex justify-center items-end">
    <hollow-dots-spinner class="z-50 relative"
        :animation-duration="1000"
        :dot-size="50"
        :dots-num="3"
        color="#333"
    />
  </div>
</template>

<script setup lang="ts">
import { HollowDotsSpinner } from 'epic-spinners'
let {show}=defineProps<{show:boolean}>()
</script>

<style scoped>

</style>