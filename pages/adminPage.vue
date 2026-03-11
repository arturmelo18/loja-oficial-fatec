<template>
  <div class="h-screen w-screen bg-white">
    <nav-bar :use-hover="false"/>
    <div class="welcome mt-5 ml-2">
      <h1>{{ `Bem vindo, ${authStore.getUser?.name}!` }}</h1>
      <h2 class="mt-2">Como você está hoje?</h2>
    </div>
    <div class="admin-content">
      <div class="products"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
/*TODO: add this middleware
definePageMeta({
  middleware: 'auth',
})
*/
</script>

<style lang="css" scoped>
.welcome {
  color: #000000;
}

.welcome h1 {
  font-size: 30px;
}
</style>