<template>
  <div>
    <LayoutsHeader/>

    <LayoutsNavbar/>
    <slot />

    <LayoutsFooter/>

  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>