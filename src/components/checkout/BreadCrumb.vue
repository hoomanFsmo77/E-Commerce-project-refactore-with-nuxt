<template>
  <div class="my-1">
    <ul class="flex flex-wrap items-center">
      <template v-for="(item,index) in pages">
        <li class="mr-0.5">
          <NuxtLink class=" text-[0.75rem] font-400 capitalize" :class="{'text-dark':item.active,'text-gray-500':!item.active}" v-if="item.link" :to="item.link">
            {{item.name}}
          </NuxtLink>
          <span :class="{'text-dark':item.active,'text-gray-500':!item.active}" class=" text-[0.75rem] capitalize font-400" v-else>
            {{item.name}}
          </span>
        </li>
        <li class="mr-0.5">
          <font-awesome-icon v-if="index!==pages.length-1" :class="{'text-dark':item.active,'text-gray-500':!item.active}" class=" !text-[0.7rem] font-400" size="l" icon="fa-solid fa-chevron-right" />
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