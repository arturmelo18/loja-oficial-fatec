<template>
  <div class="product-card" @click="goToDetailView">
    <div class="prod-img-wrap">
      <div class="prod-img-inner">
        <img v-if="imgSrc && !imgSrc.includes('shopping_bag')" :src="imgSrc" :alt="product.name"/>
        <span v-else class="emoji">👕</span>
      </div>
    </div>
    <div class="prod-info">
      <div class="prod-name">{{ product.name }}</div>
      <div class="prod-cat">{{ product.category || 'Produto' }}</div>
      <div class="prod-price-row">
        <span class="prod-price">R$ {{ formattedPrice }}</span>
      </div>
    </div>
    <button 
      class="card-heart" 
      @click.stop
      :class="{ active: isWishlisted }"
      title="Adicionar à lista de desejos"
    ></button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product';

const props = defineProps<{
  product: Product
}>()

const imgSrc = props.product.image ? props.product.image : 'https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/shopping_bag/default/48px.svg'

const isWishlisted = ref(false)

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

<style scoped>
.product-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-2px);
}

.prod-img-wrap {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #ddd6c8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.prod-img-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card:hover .prod-img-inner {
  transform: scale(1.04);
}

.prod-img-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.emoji {
  font-size: 60px;
  opacity: 0.2;
}
</style>
