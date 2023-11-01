<template>
  <section id="cover" class="md:block hidden">
    <container-full>
      <nuxt-img
          src="/cover.webp"
          alt=""
      />
    </container-full>
  </section>
  <section id="cover" class="block md:hidden">
    <container-full>
      <nuxt-img
          src="/cover-sm.webp"
           alt=""
      />
    </container-full>
  </section>

</template>

<script>
export default {
  name: "brandSection"
}
</script>

<style scoped>

</style>