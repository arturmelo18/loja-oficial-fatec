<template>
  <div class="h-screen w-screen bg-white">
    <nav-bar :use-hover="false" />
    <section class="welcome mt-5 ml-2">
      <h1>{{ `Bem vindo, ${authStore.getUser?.name}!` }}</h1>
      <h2 class="mt-2">Como você está hoje?</h2>
    </section>
    <div class="admin-content ml-2 mt-10">
      <section class="products-editor">
        <header class="flex justify-between items-center">
          <h2 class="font-medium">Produtos da loja</h2>
          <el-button class="new-product" @click="navigateTo('/productPage')"
            >Criar novo produto</el-button
          >
        </header>
        <div v-if="!isLoadingProducts" class="products mt-5" v-infinite-scroll="nextPage">
          <admin-product @update-page="searchProducts(true)" v-for="product in state.products" :product="product"/>
        </div>
        <div v-else>
          <span>Carregando produtos...</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminProduct from "~/components/AdminProduct.vue";
import type { Product } from "~/types/Product";

const isLoadingProducts = ref(false);

const LIMIT = 10;

const state = reactive({
  page: 1,
  total: 0,
  products: <Product[]>[],
});

const authStore = useAuthStore();

definePageMeta({
  middleware: 'auth',
})


onMounted(() => {
  searchProducts();
});

async function searchProducts(reset = false) {
  try {
    isLoadingProducts.value = true;
    const result = await $fetch("/api/product/searchProduct", {
      method: "POST",
      body: {
        page: state.page,
        limit: LIMIT,
      },
    });

    state.page = result.pagination.page;
    state.total = result.pagination.total;
    if (reset) {
      state.products = result.data as Product[]
    } else {
      state.products = [...state.products, ...(result.data as Product[])];
    }
  } catch (error: any) {
    ElMessage.error(error.message || "Erro inesperado");
  } finally {
    isLoadingProducts.value = false;
  }
}

function nextPage() {
  if (state.page * LIMIT > state.total) return;
  state.page += 1;
  searchProducts();
}
</script>

<style lang="css" scoped>
section {
  color: #000000;
}

.welcome h1 {
  font-size: 30px;
}

.admin-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.products-editor {
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
}

.new-product:hover {
  transform: scale(1.1);
}
</style>
