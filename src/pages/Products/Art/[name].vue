<template>
  <NuxtLink :to="{name:'Products-Item-name',params:{name:'rffrfr'}}">
    item
  </NuxtLink>
  <br>
pro art {{$route.params.name}}
</template>

<script>
export default {
  name: "[name]"
}
</script>

<style scoped>

</style>