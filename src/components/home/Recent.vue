<template>
  <section id="recent-work">
    <container>
      <row>
        <column>
          <h5 class="font-700 ">What we've been working on</h5>
        </column>
      </row>
      <row v-if="fetchFlag">
        <column class="pr-1" v-for="item in recentWorkData" col="12" md="4">
          <CardRecentwork :title="item.title" :srcset="item.srcset" :src="item.src" :sub-title="item.subTitle" :link="item.link"/>
        </column>
      </row>
      <row v-else>
        <column class="pr-1 mb-1" v-for="i in 3" col="12" sm="4">
          <Skeletor  class="rounded-4 mr-1" width="100%" :shimmer="true" height="400"/>
        </column>
      </row>
    </container>
  </section>
</template>

<script setup lang="ts">
import {Recent_Work} from "~/utils/Types";
const fetchFlag=ref<boolean>(false)
const recentWorkData=ref<Recent_Work[]>([])
const {public:{apiBase,recentWork}}=useRuntimeConfig()
onMounted(async ()=>{
  try {
    const data=await $fetch<Recent_Work[]>(apiBase + recentWork)
    recentWorkData.value=data
  }catch (err) {
    console.log(err)
  }finally {
    fetchFlag.value=true
  }
})

</script>

<style scoped>

</style>