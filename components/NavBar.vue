<template>
  <nav class="nav-bar flex">
    <nuxt-link
      to="/homePage"
      class="self-center text-lg min-w-100 ml-2"
    >Loja oficial da Fatec</nuxt-link>
    <ul class="flex justify-end items-center w-full">
      <li
        v-for="card in cards"
        :key="card.title"
        class="mr-2 ml-2"
      >
        <nuxt-link :to="card.to">{{ card.title }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const cards = [
  {
    title: 'Home',
    to: '/homePage',
  },
  {
    title: 'Área do administrador',
    to: '/adminPage',
  },
]
</script>

<style lang="css" scoped>
.nav-bar {
  color: #000000;
  font-weight: 500;
  font-size: 15px;
  height: 75px;
  transition: all 0.3s ease;
}

.nav-bar:hover {
  background: #4A0F01;
  color: #ffffff;
}
</style>
