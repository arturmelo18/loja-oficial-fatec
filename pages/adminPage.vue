<template>
  <div class="h-screen w-screen bg-white">
    <nav-bar />
    <div class="welcome mt-5">
      <h1>{{ `Bem vindo, ${authStore.getUser?.name}!` }}</h1>
      <h2>Como você está hoje?</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

/*
definePageMeta({
  middleware: 'auth',
})
*/
</script>
