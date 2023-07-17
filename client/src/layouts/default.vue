<template>
  <div>
    <LayoutHeader/>
    <LayoutNavbar/>
    <DiscountAlert />
    <slot ></slot>
    <LayoutFooter/>
  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>