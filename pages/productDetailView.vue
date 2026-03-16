<template>
  <div class="h-screen w-screen bg-white">
    <NavBar />
    <div class="flex mx-5 my-5 justify-center">
      <img :src="imgSrc" class="w-[400px] h-[500px]" />
      <div class="product-information ml-4">
        <h1 class="mb-4 font-semibold text-5xl">{{ state.product.name }}</h1>
        <p>{{ state.product.description }}</p>
        <h2 class="mt-2">R$ {{ formattedPrice }}</h2>
        <p class="mt-2">Quantidade em estoque: {{ state.product.quantity }}</p>

        <el-input-number v-model="state.saleQtd" :min="1" class="mt-2" />

        <el-button type="info" class="mt-5">
          Comprar
        </el-button>
      </div>
    </div>
    <LofFooter />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import LofFooter from '~/components/LofFooter.vue'
import type { Product } from '~/types/Product'

const route = useRoute()

const state = reactive({
  product: {} as Product,
  saleQtd: 1
})

const imgSrc = computed(
  () =>
    state.product.image ||
    'https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/shopping_bag/default/48px.svg'
)

const formattedPrice = computed(() =>
  Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false
  }).format((Number(state.product.price) || 0) * state.saleQtd)
)

onMounted(async () => {
  if (!route.query._id) return
  try {
    state.product = await $fetch<Product>('/api/product/getProduct', {
      method: 'GET',
      params: { _id: route.query._id }
    })
  } catch {
    ElMessage.error('Erro ao carregar produto')
  }
})

definePageMeta({
  middleware: 'auth'
})
</script>

<style lang="css" scoped>
.product-information {
  display: flex;
  flex-direction: column;
  color: #000000;
}

img {
  border-radius: 9px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
}
</style>