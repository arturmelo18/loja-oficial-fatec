<template>
  <div class="h-screen w-screen bg-cream">
    <nav-bar />
    
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="adm-sidebar-title">Painel Admin</div>
        <ul class="adm-nav">
          <li><a @click="currentSection = 'dashboard'" :class="{ active: currentSection === 'dashboard' }">Dashboard</a></li>
          <li><a @click="currentSection = 'produtos'" :class="{ active: currentSection === 'produtos' }">Produtos</a></li>
          <li><a @click="navigateTo('/productPage')" class="adm-nav-link">+ Novo Produto</a></li>
        </ul>
      </aside>
      
      <main class="admin-main">
        <div v-if="currentSection === 'dashboard'">
          <div class="adm-title">Dashboard</div>
          <p style="font-size: 13px; color: #6B6B6B;">Bem-vindo ao painel de administração Fatecano.</p>
        </div>
        
        <div v-if="currentSection === 'produtos'">
          <div class="adm-title">Gerenciar Produtos</div>
          
          <div v-if="!isLoadingProducts" class="products-table-container mt-5" v-infinite-scroll="nextPage">
            <table class="products-table">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in state.products" :key="product._id">
                  <td>
                    <img :src="product.image" class="product-image" />
                  </td>
                  <td>{{ product.name }}</td>
                  <td>R${{ product.price }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>
                    <div class="action-buttons">
                      <el-button class="edit-button" @click="goToEditProduct(product._id)">Editar</el-button>
                      <el-button class="delete-button mx-1" @click="deleteProduct(product._id)">
                        <i class="uil uil-trash-alt text-red-800 text-2xl"></i>
                      </el-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <span>Carregando produtos...</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

const isLoadingProducts = ref(false);
const currentSection = ref('produtos'); // Iniciar na aba de produtos para facilitar a visualização

const LIMIT = 10;

const state = reactive({
  page: 1,
  total: 0,
  products: <Product[]>[],
});

definePageMeta({
  middleware: 'auth',
});

onMounted(() => {
  searchProducts();
});

async function searchProducts(reset = false) {
  try {
    isLoadingProducts.value = true;
    if (reset) {
      state.page = 1;
      state.products = [];
    }
    const result = await $fetch("/api/product/searchProduct", {
      method: "POST",
      body: {
        page: state.page,
        limit: LIMIT,
      },
    });

    state.page = result.pagination.page;
    state.total = result.pagination.total;
    state.products = [...state.products, ...(result.data as Product[])];
  } catch (error: any) {
    ElMessage.error(error.message || "Erro inesperado");
  } finally {
    isLoadingProducts.value = false;
  }
}

function nextPage() {
  if (state.page * LIMIT >= state.total) return;
  state.page += 1;
  searchProducts();
}

const goToEditProduct = (productId?: string) => {
  if (!productId) return;
  navigateTo({
    path: '/productPage',
    query: { _id: productId },
  });
};

async function deleteProduct(productId?: string) {
  if (!productId) return;
  
  try {
    await ElMessageBox.confirm(
      'Você quer realmente excluir o produto?',
      'Atenção',
      {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonClass: 'el-button--danger',
      }
    );
    
    await $fetch('/api/product/deleteProduct', {
      method: 'DELETE',
      body: { productId }
    });

    ElMessage.success('Produto excluído com sucesso!');
    searchProducts(true); // Reseta e busca os produtos novamente
  } catch (error) {
    // Se o erro for 'cancel', o usuário clicou em "Não", então não fazemos nada.
    if (error !== 'cancel') {
      ElMessage.error('Erro ao excluir o produto.');
    }
  }
}
</script>

<style scoped>
.bg-cream {
  background: #F2EDE6;
}

.adm-nav-link {
  cursor: pointer;
}

.admin-sidebar {
   background: #F2EDE6;
}

.adm-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.adm-nav li {
  border-bottom: 1px solid #ddd; /* Divisória */
}

.adm-nav li a {
  display: block;
  padding: 12px 15px;
  color: #000000; /* Cor do texto preta */
  text-decoration: none;
  cursor: pointer;
}

.adm-nav li a:hover,
.adm-nav li a.active {
  background-color: #e9ecef; /* Cor de fundo para item ativo/hover */
}

.products-table-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.products-table th, .products-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
}

.products-table th {
  font-weight: 600;
  color: #333;
}

.products-table tbody tr:last-child td {
  border-bottom: none;
}

.product-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.edit-button, .delete-button {
  border: none;
  background: transparent;
  padding: 6px;
}
</style>
