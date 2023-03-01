<template>
  <section id="newsletter" class="my-2">
    <container-full >
      <row class="sm:!mx-2 !mx-1">
        <column col="12"  class="py-4 bg-dark rounded-6 ">
          <row class="justify-center">
            <column col="12" sm="5" class="px-1">
              <h2 class="text-light font-600 text-center">
                Get 10% Off When You Join the Brentos Newsletter
              </h2>
              <FormIGroup v-model="userEmail" @action="submit" type="email" placeholder="Enter your email"/>
              <h6 class="text-center text-light my-1" v-if="$route.query.submit==='true'">Thank you for submitting!</h6>
            </column>
          </row>
        </column>
      </row>
    </container-full>
  </section>
</template>

<script setup lang="ts">
import {setCookie,hashCode} from "~/utils/Helper";
//////////////////////////////////////////
let userEmail=ref<string>('')
const submit = () => {
  let userHashCode=hashCode(userEmail.value)
  setCookie('_news_letter_',userHashCode,3)
  return navigateTo({
    name:'challenge',
    query:{
      email:userEmail.value
    },
    hash:`#${userHashCode}`
  })
}
</script>

<style scoped>

</style>