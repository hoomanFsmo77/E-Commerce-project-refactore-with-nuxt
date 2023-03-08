<template>
  <NuxtLayout name="default">
    <section class="py-2" id="not-found-page">
      <container>
        <row>
          <column col="12">
            <h1 class="font-700 ">Code {{error.statusCode}}: {{error.message}}</h1>
            <p class="mt-1 mb-2">The page you are looking for cannot be found</p>
            <button class="btn btn-lg btn-dark-fill " @click="returnHome">
              Continue Browsing
            </button>
          </column>
        </row>
      </container>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error=useError()
const returnHome = () => {
 return  clearError({
   redirect:'/'
 })
}

</script>

<style scoped>

</style>