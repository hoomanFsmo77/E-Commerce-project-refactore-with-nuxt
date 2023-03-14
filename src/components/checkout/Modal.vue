<template>
  <div class="flex justify-between p-0.5 w-full items-center">
    <h3>{{title.split('-').join(' ')}}</h3>
    <font-awesome-icon size="lg" class="cursor-pointer text-gray-700 " @click="$emit('closeModal',false)" icon="fa-solid fa-x" />
  </div>
  <div class="divider"></div>
  <div class="p-0.7">
    <div class="mb-1.5" v-for="item in data">
      <p v-if="item.title" class="font-600 text-gray-600 !text-1">{{item.title}}</p>
      <p class="!text-0.9 !font-500 text-gray-600" v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolicyModal",
  props:['title','data']
}
</script>

<style scoped>

</style>