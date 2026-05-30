<template>
  <div class="h-screen w-screen bg-cream">
    <NavBar />
    
    <div class="modal-overlay open">
      <div class="modal-box">
        <button class="modal-close-btn" @click="navigateTo('/')"></button>
        
        <div class="modal-img-side">
          <img 
            v-if="imgSrc && !imgSrc.includes('shopping_bag')"
            :src="imgSrc" 
            :alt="state.product.name"
          />
          <span v-else class="emoji">👕</span>
        </div>
        
        <div class="modal-body-side">
          <div class="m-cat">{{ state.product.category || 'Produto' }}</div>
          
          <div class="m-name-row">
            <div class="m-name">{{ state.product.name }}</div>
          </div>
          
          <div class="m-price-row">
            <span class="m-price">R$ {{ formattedPrice }}</span>
          </div>
          
          <div class="m-desc">{{ state.product.description }}</div>
          
          <div style="margin-bottom: 20px; margin-top: 16px; font-size: 13px; color: #6B6B6B;">
            <div>Quantidade em estoque: {{ state.product.quantity }}</div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
            <el-input-number 
              v-model="state.saleQtd" 
              :min="1" 
              :max="state.product.quantity"
              size="large"
            />
            <span style="font-size: 13px; color: #6B6B6B;">Quantidade</span>
          </div>
          
          <button class="btn btn-dark" style="width: 100%;">
            Comprar
          </button>
        </div>
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

<style scoped>
.bg-cream {
  background: #F2EDE6;
}

.emoji {
  font-size: 80px;
  opacity: 0.2;
}

.modal-img-side {
  width: 100%;
  height: 600px; /* ou a altura que desejar */
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream-dark);
}

.modal-img-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.modal-img-side .emoji {
  font-size: 80px;
  opacity: 0.2;
}
</style>
