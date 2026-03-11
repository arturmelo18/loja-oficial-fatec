<template>
  <nav class="flex" :class="props.useHover ? 'nav-bar' : 'nav-bar-no-hover'">
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

const props = defineProps<{
  useHover?: boolean
}>()

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
.nav-bar-no-hover {
  color: #ffffff;
  background: #4A0F01;
  font-weight: 500;
  font-size: 15px;
  height: 75px;
}

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
