<template>
  <li class="  border-b-[1px] border-gray-200">
    <NuxtLink v-if="!data.subMenu>0" @click="isActive=!isActive"  class="navbar-link flex justify-between py-0.9 px-1" :to="data.link">
      <span class="navbar-link-content btn-link btn-stretch ">{{data.name}}</span>
      <font-awesome-icon v-if="data.subMenu>0" icon="fa-solid fa-chevron-right" :class="{'rotate-[90deg] ':isActive}" class="transition-all"/>
    </NuxtLink>
    <div  v-else @click="isActive=!isActive"  class="navbar-link cursor-pointer flex justify-between py-0.9 px-1" >
      <span class="navbar-link-content btn-link btn-stretch ">{{data.name}}</span>
      <font-awesome-icon v-if="data.subMenu>0" icon="fa-solid fa-chevron-right" :class="{'rotate-[90deg] ':isActive}" class="transition-all"/>
    </div>

    <NavbarMobileSub v-if="data.subMenu>0" :is-active="isActive">
      <li class="px-1" v-on="lvl2.subMenu>0 && subActiveEvent" v-for="lvl2 in data.children">
          <NuxtLink v-if="!lvl2.subMenu>0" class="navbar-link !justify-between" :to="lvl2.link">
            <span class="navbar-link-content !font-500 btn-link btn-stretch ">{{lvl2.name}}</span>
            <font-awesome-icon :class="{'rotate-[90deg] ':subActive}"  v-if="lvl2.subMenu>0" class="!text-0.8 transition-all" icon="fa-solid fa-chevron-right" />
          </NuxtLink>
          <div v-else class="navbar-link !justify-between" >
            <span class="navbar-link-content !font-500 btn-link btn-stretch ">{{lvl2.name}}</span>
            <font-awesome-icon :class="{'rotate-[90deg] ':subActive}"  v-if="lvl2.subMenu>0" class="!text-0.8 transition-all" icon="fa-solid fa-chevron-right" />
          </div>
        <NavbarMobileSub :is-active="subActive">
            <li class="px-1" v-for="lvl3 in lvl2.children">
              <NuxtLink  class="navbar-link !justify-start" :to="lvl3.link">
                  <span class="navbar-link-content !font-500 btn-link btn-stretch ">{{lvl3.name}}</span>
              </NuxtLink>
            </li>
        </NavbarMobileSub>
      </li>
    </NavbarMobileSub>
  </li>
</template>

<script setup lang="ts">
let {data}=defineProps<{
  data:any[]
}>()
const isActive=ref<boolean>(false)
const subActive=ref<boolean>(false)

const toggleSubMenu = () => {
  subActive.value=!subActive.value
}
let subActiveEvent={
  'click':toggleSubMenu
}
</script>

<style scoped>

</style>