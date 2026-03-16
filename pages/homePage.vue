<template>
  <div class="h-screen w-screen bg-white">
    <div class="nav-bg">
      <nav-bar :use-hover="true"/>
    </div>
    <gradient-divisor />
    <div class="products mt-5 bg-white">
      <h1>Produtos</h1>
      <div v-if="!isLoading" class="flex mt-5" v-infinite-scroll="nextPage">
          <product-view v-for="product in state.products" :product="product" class="ml-2 mr-2"/>
        </div>
        <div v-else>
          <span>Carregando produtos...</span>
        </div>
    </div>
    <lof-footer/>
  </div>
  <!-- <ShopCartDrawer /> -->
</template>

<script setup lang="ts">
import GradientDivisor from '~/components/GradientDivisor.vue';
import LofFooter from '~/components/LofFooter.vue';
import type { Product } from '~/types/Product';
// import ShopCartDrawer from '~/components/ShopCartDrawer.vue'

const LIMIT = 20

const state = reactive({
  page: 1,
  total: 0,
  products: <Product[]>[]
})

const isLoading = ref(false)

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
   try{
    isLoading.value = true
    const result = await $fetch('/api/product/searchProduct', {
      method: 'POST',
      body: {
        page: state.page,
        limit: LIMIT
      }
    })

    state.page = result.pagination.page
    state.total = result.pagination.total
    state.products = [...state.products,...result.data as Product[]]
 } catch(error: any) {
  ElMessage.error(error.message || 'Erro inesperado')
 } finally {
  isLoading.value = false
 }
}

function nextPage() {
  if (state.page * LIMIT > state.total) return
  state.page += 1
  fetchData()
}

definePageMeta({
  middleware: 'auth',
})
</script>

<style lang="css" scoped>
.nav-bg {
  background-image: url('/imgs/cleversson.jpeg');
  height: 600px;
  background-size: cover;
}

.products h1 {
  color: #000000;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
}
</style>
