<template>
  <div class="h-screen w-screen bg-white">
    <div class="nav-bg">
      <nav-bar />
    </div>
    <div class="products">
      <h1>Produtos</h1>
    </div>
  </div>
  <!-- <ShopCartDrawer /> -->
</template>

<script setup lang="ts">
// import ShopCartDrawer from '~/components/ShopCartDrawer.vue'
definePageMeta({
  middleware: 'auth',
})
</script>

<style lang="css" scoped>
.nav-bg {
  background-image: url('/imgs/cleversson.jpeg');
  height: 600px;
  background-size: cover;
  background-position: center;
}
</style>
