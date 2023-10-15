<template>
    <div class="pagination">
      <button :disabled="currentPage===1" :class="{'disabled':currentPage===1}" @click="prev" class="pagination-btn mr-1">
        <font-awesome-icon  icon="fa-solid fa-chevron-left" />
      </button>

      <button :class="{'selected':currentPage===i}" @click="paginating(i)" v-for="i in pages" :key="i" class="pagination-counter mr-1">
        {{i}}
      </button>

      <button :disabled="currentPage===pages" :class="{'disabled':currentPage===pages}" @click="next" class="pagination-btn">
        <font-awesome-icon  icon="fa-solid fa-chevron-right" />
      </button>
    </div>
</template>

<script setup lang="ts">
import {corePagination} from "~/composables/usePagination";
const props=defineProps<{
  itemInWarp:number
  source:any[]
}>();
const emit=defineEmits<{
  (e:'update',val:any[]):void
  (e:'period',val:{start:number,end:number}):void
}>();
const {pages,paginating,currentPage,prev,next}=corePagination(props,emit)
</script>

<style scoped>

</style>