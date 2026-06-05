<template>
  <div class="h-screen w-screen bg-cream">
    <nav-bar/>
    
    <div class="hero" v-if="slides.length > 0">
      <div class="carousel" id="carousel">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          :class="['carousel-slide', { active: currentSlide === index }]"
        >
          <div class="slide-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      
      <button class="carousel-btn prev" @click="prevSlide">‹</button>
      <button class="carousel-btn next" @click="nextSlide">›</button>
      
      <div class="carousel-dots">
        <button 
          v-for="(_, index) in slides"
          :key="index"
          :class="['c-dot', { active: currentSlide === index }]"
          @click="currentSlide = index"
        ></button>
      </div>
    </div>

    <!-- PRODUCTS SECTION -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Novidades</h2>
      </div>
      <div v-if="state.products.length === 0 && !isLoading" class="flex justify-center">
        <img src="../imgs/no_products.png" class="w-[800px] h-[400px]">
      </div>
      <div v-else-if="!isLoading" class="products-grid" v-infinite-scroll="nextPage">
        <product-view v-for="product in state.products" :key="product._id" :product="product"/>
      </div>
      <div v-else class="flex justify-center">
        <span>Carregando produtos...</span>
      </div>
    </div>

    <lof-footer/>
  </div>
</template>

<script setup lang="ts">
import GradientDivisor from '~/components/GradientDivisor.vue';
import LofFooter from '~/components/LofFooter.vue';
import type { Product } from '~/types/Product';

const LIMIT = 20

const currentSlide = ref(0)
const slides = ref<{ title: string; description: string; image: string }[]>([])
const storeName = ref('')

const state = reactive({
  page: 1,
  total: 0,
  products: <Product[]>[]
})

const isLoading = ref(false)

onMounted(async () => {
  try {
    const store = await $fetch<any>('/api/store/getStore')
    if (store) {
      slides.value = store.slides
      storeName.value = store.name
    }
  } catch {
    // fallback vazio — carrossel não aparece
  }

  await fetchData()

  if (slides.value.length > 1) {
    setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }, 5000)
  }
})

async function fetchData() {
  try {
    isLoading.value = true
    const result = await $fetch('/api/product/getProductList', {
      method: 'GET',
      params: {
        page: state.page,
        limit: LIMIT
      }
    })

    state.page = result.pagination.page
    state.total = result.pagination.total
    state.products = [...state.products, ...result.data as Product[]]
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

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}
</script>

<style scoped>
.bg-cream {
  background: #F2EDE6;
}
</style>
