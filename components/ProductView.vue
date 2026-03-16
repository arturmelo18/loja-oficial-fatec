<template>
  <div class="content bg-white mb-5" @click="goToDetailView">
    <img :src="imgSrc" class="flex-1"/>
    <div class="informations mt-2 flex items-start flex-wrap">
      <h2 class="mb-1">{{ props.product.name }}</h2>
      <span>{{ `R$ ${formattedPrice}` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product';

const props = defineProps<{
  product: Product
}>()

const imgSrc = props.product.image ? props.product.image : 'https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/shopping_bag/default/48px.svg'

const formattedPrice = computed(() =>
  Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false
  }).format(Number(props.product.price) || 0)
)

function goToDetailView() {
  if (!props.product._id) return
  navigateTo({
    path: '/productDetailView',
    query: { _id: props.product._id },
  })
}
</script>

<style lang="css" scoped>
.content {
  border-radius: 16px;
  border: 1px solid #696767;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  display: flex;
  color: #000000;
  height: 300px;
  width: 180px;
  flex-wrap: wrap;
  cursor: pointer;
}

img {
  border-radius: 9px;
  height: 180px;
}
</style>