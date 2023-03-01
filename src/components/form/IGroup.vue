<template>
  <form @submit.prevent="submit">
    <div class="w-full flex mt-1.5 ">
      <input required class="input-dark w-full" :value="modelValue" @input="input($event)" :placeholder="placeholder" :type="type">
      <button class="btn btn-dark-outline-light" type="submit">
        submit
      </button>
    </div>
  </form>

</template>

<script setup lang="ts">
let props=defineProps<{
  type:string
  placeholder:string
  modelValue:string
}>();
let emit=defineEmits<{
  (e:'update:modelValue',value:string):void
  (e:'action'):void
}>()
const input = (e:Event) => {
  emit('update:modelValue',(e.target as HTMLInputElement).value)
}
const submit = () => {
  emit('action')
}
</script>

<style scoped>

</style>