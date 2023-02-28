<template>
    <teleport to="body">
      <div  @click.self="closeModal" class="modal " v-fade:99999="isActive">
        <LoaderPreloader class="!items-center !h-[100%] z-[999999]" :show="!preloader"/>
        <div @click.self="closeModal" class="v-modal-container">
          <div  v-bind="$attrs" class="modal-content">
            <row :class="rowClass">
             <slot></slot>
            </row>
          </div>
        </div>
      </div>
    </teleport>
  <DarkOverlay :is-fire="isActive" z-index="9999"/>
</template>

<script setup lang="ts">
const props=defineProps<{
  isActive:boolean
  preloader:boolean
  rowClass:string
}>();
const emit=defineEmits<{
  (e:'closeModal',val:boolean):void
}>();
const closeModal = () => {
  emit('closeModal',false)
}
</script>

<style scoped>

</style>