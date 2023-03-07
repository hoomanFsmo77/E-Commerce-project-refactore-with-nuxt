<template>
    <div class="my-1">
      <ul class="flex flex-wrap items-center">
        <template v-for="(item,index) in pages">
          <li class="mr-1">
            <NuxtLink class=" text-[0.85rem] capitalize" v-if="item.link" :to="item.link">
              {{item.name}}
            </NuxtLink>
            <span class=" text-[0.85rem] capitalize" v-else>
            {{item.name}}
          </span>
          </li>
          <li class="mr-1">
            <span  class="text-[0.85rem] " v-if="index!==pages.length-1">/</span>
          </li>
        </template>

      </ul>
    </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props:['pages']
}
</script>

<style scoped>

</style>