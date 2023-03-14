<template>
  <div class="relative w-full my-0.5">
    <input :class="{'!border-red-600':errorFlag}" @input="$emit('update:modelValue',$event.target.value)" :value="modelValue" type="text" class="input-float peer"  required>
    <label class="float-placeholder peer-focus:bottom-[75%] peer-focus:px-[8px] peer-focus:bg-white peer-focus:text-0.8 peer-valid:bottom-[75%] peer-valid:px-[8px] peer-valid:bg-white peer-valid:text-0.8 peer-focus:rounded-t-4 peer-valid:rounded-t-4">
      {{placeholder}}
    </label>
  </div>
  <p class="text-red-600 font-400 text-0.9 mb-0.5" v-if="errorFlag">{{errorMessage}}</p>

</template>

<script>
export default {
  name: "FloatInput",
  props:['modelValue','placeholder','errorMessage','errorFlag'],

}
</script>

<style scoped>

</style>