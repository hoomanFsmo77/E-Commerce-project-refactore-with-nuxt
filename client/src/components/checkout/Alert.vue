<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <h5 class="font-400">
        <font-awesome-icon class="!text-gray-600 text-1.3" icon="fa-solid fa-circle-exclamation" />
        Alert
      </h5>
      <font-awesome-icon size="lg" class="cursor-pointer text-gray-700 " @click="$emit('closeModal',false)" icon="fa-solid fa-x" />
    </div>
    <p class="text-center font-400 mb-1">
       This project is just in client side and does not have backend database, therefore all of your given information won't be released or used in any kind of crime.
    </p>
    <p class="text-center font-400">
      you can also enter some fake information to just see the result.
    </p>
  </div>

</template>

<script>
export default {
  name: "AlertMessage"
}
</script>

<style scoped>

</style>