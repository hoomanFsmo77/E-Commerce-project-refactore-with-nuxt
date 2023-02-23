<template>
  <main>
    <LayoutsHeader/>
    <LayoutsNavbar/>
    <slot/>
    <LayoutsFooter/>
  </main>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>