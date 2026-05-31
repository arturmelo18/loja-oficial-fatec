<template>
  <div class="h-screen w-screen bg-cream">
    <NavBar />

    <div class="modal-overlay open">
      <div class="modal-box product-modal-box">
        <button class="modal-close-btn" @click="navigateTo('/')">×</button>

        <div class="modal-img-side">
          <img
            v-if="imgSrc"
            :src="imgSrc"
            :alt="state.product.name"
          />
          <div v-else class="img-placeholder">
            <i class="ti ti-shirt"></i>
          </div>
        </div>

        <div class="modal-body-side">
          <span class="prod-badge-label">Produto</span>
          <h1 class="prod-modal-name">{{ state.product.name }}</h1>
          <span class="prod-modal-ref">REF: {{ state.product._id?.slice(-6).toUpperCase() }}</span>

          <hr class="prod-divider" />

          <div class="prod-modal-price">{{ formattedPrice }}</div>
          <div class="prod-price-unit">por unidade</div>

          <p class="prod-modal-desc">{{ state.product.description }}</p>

          <div class="prod-stock-info">
            <span class="stock-dot"></span>
            {{ state.product.quantity }} unidades em estoque
          </div>

          <span class="qty-label">Quantidade</span>
          <div class="qty-row">
            <button
              class="qty-btn"
              :disabled="state.saleQtd <= 1"
              @click="state.saleQtd--"
            >−</button>
            <span class="qty-num">{{ state.saleQtd }}</span>
            <button
              class="qty-btn"
              :disabled="state.saleQtd >= state.product.quantity"
              @click="state.saleQtd++"
            >+</button>
          </div>

          <button class="btn btn-dark" style="width:100%;" :disabled="isAdding" @click="addToCart">
            <i class="ti ti-shopping-cart"></i>
            {{ isAdding ? 'Adicionando...' : 'Adicionar ao Carrinho' }}
          </button>
        </div>
      </div>
    </div>

    <LofFooter />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'

const route = useRoute()
const authStore = useAuthStore()
const isAdding = ref(false)

const state = reactive({
  product: {} as Product,
  saleQtd: 1,
})

const imgSrc = computed(() =>
  state.product.image || null
)

const formattedPrice = computed(() =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format((Number(state.product.price) || 0) * state.saleQtd)
)

onMounted(async () => {
  if (!route.query._id) return
  try {
    state.product = await $fetch<Product>('/api/product/getProduct', {
      method: 'GET',
      params: { _id: route.query._id },
    })
  } catch {
    ElMessage.error('Erro ao carregar produto')
  }
})

async function addToCart() {
  if(!authStore.getUser) {
    ElMessage.info('Para realizar uma compra você precisa estar cadastrado em nosso site.')
    return
  }

  const cartId = authStore.getCart?._id
  if (!cartId) {
    ElMessage.error('Carrinho não encontrado')
    return
  }

  isAdding.value = true
  try {
    await $fetch('/api/cart/items/addItem', {
      method: 'POST',
      body: {
        cartId,
        productId: state.product._id,
        quantity: state.saleQtd,
      },
    })
    ElMessage.success('Produto adicionado ao carrinho!')
  } catch (error: any) {
    ElMessage.error(error.data?.statusMessage || 'Erro ao adicionar ao carrinho')
  } finally {
    isAdding.value = false
  }
}
</script>

<style scoped>
.bg-cream { background: #F2EDE6; }

.product-modal-box {
  max-width: 860px !important;
  flex-direction: row !important;
  max-height: 92vh;
}

.modal-img-side {
  width: 420px;
  flex-shrink: 0;
  background: var(--cream-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.modal-img-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-placeholder {
  opacity: 0.2;
  font-size: 72px;
  color: var(--black);
}

.modal-body-side {
  flex: 1;
  padding: 2.5rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.prod-badge-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-bottom: 8px;
  display: block;
}

.prod-modal-name {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 300;
  font-style: italic;
  line-height: 1.15;
  margin-bottom: 6px;
}

.prod-modal-ref {
  font-size: 11px;
  color: var(--gray);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 18px;
}

.prod-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin-bottom: 18px;
}

.prod-modal-price {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 400;
  color: var(--black);
  margin-bottom: 4px;
}

.prod-price-unit {
  font-size: 12px;
  color: var(--gray);
  margin-bottom: 16px;
}

.prod-modal-desc {
  font-size: 13px;
  color: var(--gray);
  line-height: 1.7;
  margin-bottom: 20px;
}

.prod-stock-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--gray);
  margin-bottom: 18px;
}

.stock-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4a7c59;
  flex-shrink: 0;
}

.qty-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--gray);
  margin-bottom: 8px;
  display: block;
}

.qty-row {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  width: fit-content;
  margin-bottom: 24px;
}

.qty-btn {
  width: 38px;
  height: 38px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.qty-btn:hover:not(:disabled) { background: var(--cream-dark); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.qty-num {
  width: 44px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  line-height: 38px;
}

@media (max-width: 700px) {
  .product-modal-box { flex-direction: column !important; }
  .modal-img-side { width: 100%; height: 260px; }
}
</style>