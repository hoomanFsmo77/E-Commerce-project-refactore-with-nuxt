<template>
  <section class="py-2" id="policy">
    <container>
      <row class="justify-center">
        <column col="12" md="6">
          <h1 class="text-center font-700">{{ $route?.params?.name?.split('-').join(' ') ?? ''}}</h1>
          <LoaderPage class="!static !items-center !h-[200px]" :show="!fetchFlag"/>
          <template v-if="fetchFlag">
            <div class="my-1.5" v-for="item in policyData">
              <p v-if="item.title" class="font-600 !text-1">{{ item.title }}</p>
              <p class="!text-0.9 !font-500" v-html="item.content"></p>
            </div>
          </template>

        </column>
      </row>
    </container>
  </section>

</template>

<script setup lang="ts">
const policyData = ref<any[]>([])
const fetchFlag = ref<boolean>(false)
const route = useRoute()
onMounted(async ()=>{
  const token=useState<string>('x_token_x')
  fetchFlag.value=false
  try {
    const data=await $fetch(`/api/policy/${route.params.name}`,{headers:{'Authentication':token.value}})
    policyData.value=data
  }catch (err) {
    createError({
      message:'Page not found!',
      statusCode:404,
      statusMessage:'Page not found!'
    })
  }finally {
    fetchFlag.value=true
  }
})


</script>

<style scoped>

</style>