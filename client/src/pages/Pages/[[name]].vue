<template>
  <section>
    <container>
      <row>
        <column col="12">
          <BreadCrumb :pages="
            [{name:'Home',link:{name:'index'}},
            {name:$route?.params?.name.split('-').join(' ') ?? ''}]"
          />
          <h1 class="font-600 text-left mb-1 capitalize">{{ $route?.params?.name.split('-').join(' ') ?? ''}}</h1>
        </column>
      </row>
      <LoaderPage class="!static !items-center !h-[300px]" :show="!fetchFlag"/>
      <template v-if="fetchFlag">
        <row>
          <CardPageRow
              v-for="item in pageData"
              :col="item.col"
              :top-title="item.topTitle"
              :src="item.src"
              :bottom-title="item.bottomTitle"
              :description="item.description"
              :link="item.link"
              :video="item.video"
          />
        </row>
      </template>
    </container>
  </section>
</template>

<script setup lang="ts">
const fetchFlag = ref(false)
const pageData = ref([])
const route=useRoute()
onMounted(async ()=>{
  const token=useState<string>('x_token_x')
  fetchFlag.value = false
  try {
    const data=await $fetch(`/api/pages/${route.params.name}`,{headers:{'Authentication':token.value}})
    pageData.value=data
    fetchFlag.value = true
  }catch (err) {
    console.log(err)
    createError({
      statusCode:404,
      message:'Page not found!'
    })
  }
})

// watch(
//     () => route.params,
//     () => {
//       if (route.name === 'MAIN_PAGES') {
//         fetchFlag.value = false
//         axios.get(`https://ecommerce-199b2-default-rtdb.firebaseio.com/pages/pagesData/${route.params.name}.json`).then(response => {
//           pageData.value = response.data
//           fetchFlag.value = true
//         })
//       }
//     }, {
//       immediate: true
//     }
// )

</script>

<style scoped>

</style>