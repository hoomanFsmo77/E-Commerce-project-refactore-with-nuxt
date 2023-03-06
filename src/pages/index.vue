<template>
  <HomePreloader :show="false"/>
  <HomeBrand />
  <HomeIntro />
  <HomeShop />
  <HomePopular />
  <HomeStory />
  <HomeService />
  <HomeNews />
  <HomeRecent />
  <HomeInstagram />
</template>

<script setup lang="ts">
const {isLoading}=useLoader()
</script>

<style scoped>

</style>