<template>
  <row class="items-center flex-wrap !my-0 !py-0">
    <column col="9" >
      <ul class="flex gap-1.6 items-center flex-wrap" v-if="flag">
        <NavbarDesktopItem v-for="item in navbarData" :key="item.id" :data="item"/>
      </ul>
    </column>
    <column col="3">
      <div class="flex justify-end gap-1 items-center">
        <font-awesome-icon icon="fa-solid fa-truck-fast" size="2xl" class="text-dark"/>
        <div>
          <span class="text-0.7 ">Free Shipping in Australia</span>
          <br>
          <span class=" text-dark">Orders Over $70</span>
        </div>
      </div>
    </column>
  </row>
</template>

<script lang="ts" setup>
const navbarData=ref<any[]>([])
const flag=ref<boolean>(false)
onMounted(async ()=>{
  flag.value=false
  const token=useState<string>('x_token_x')
  try {
    const data=await $fetch<any[]>('/api/navbar',{headers:{'Authentication':token.value}})
    navbarData.value=data
  }catch (err) {
    console.log(err)
  }finally {
    flag.value=true
  }
})

</script>

<style scoped>

</style>