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
          <li><a @click="loadUsers(); currentSection = 'usuarios'" :class="{ active: currentSection === 'usuarios' }">Usuários</a></li>
        </ul>
      </aside>
      
      <main class="admin-main">

        <!-- Dashboard -->
        <div v-if="currentSection === 'dashboard'">
          <div class="adm-title">Dashboard</div>
          <p style="font-size: 13px; color: #6B6B6B;">Bem-vindo ao painel de administração Fatecano.</p>
        </div>
        
        <!-- Produtos -->
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
                  <td><img :src="product.image" class="product-image" /></td>
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

        <!-- Usuários -->
        <div v-if="currentSection === 'usuarios'">
          <div class="adm-title">Gerenciar Usuários</div>

          <div v-if="!isLoadingUsers" class="products-table-container mt-5">
            <table class="products-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in state.users" :key="user._id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span :class="['kind-badge', user.kind === 'admin' ? 'kind-admin' : 'kind-user']">
                      {{ user.kind === 'admin' ? 'Admin' : 'Usuário' }}
                    </span>
                  </td>
                  <td>
                    <el-button
                      class="edit-button"
                      @click="toggleKind(user)"
                    >
                      {{ user.kind === 'admin' ? 'Tornar Usuário' : 'Tornar Admin' }}
                    </el-button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="pagination-row">
              <el-button
                :disabled="usersPage <= 1"
                @click="prevUsersPage"
              >Anterior</el-button>
              <span class="page-info">Página {{ usersPage }}</span>
              <el-button
                :disabled="usersPage * USERS_LIMIT >= usersTotal"
                @click="nextUsersPage"
              >Próxima</el-button>
            </div>
          </div>
          <div v-else>
            <span>Carregando usuários...</span>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
import type { User } from '~/types/User'

const isLoadingProducts = ref(false)
const isLoadingUsers = ref(false)
const currentSection = ref('produtos')

const LIMIT = 10
const USERS_LIMIT = 10

const state = reactive({
  page: 1,
  total: 0,
  products: [] as Product[],
  users: [] as User[],
})

const usersPage = ref(1)
const usersTotal = ref(0)

definePageMeta({ middleware: 'auth' })

onMounted(() => {
  searchProducts()
})

// ── Produtos ──────────────────────────────────────────────

async function searchProducts(reset = false) {
  try {
    isLoadingProducts.value = true
    if (reset) {
      state.page = 1
      state.products = []
    }
    const result = await $fetch('/api/product/searchProduct', {
      method: 'POST',
      body: { page: state.page, limit: LIMIT },
    })
    state.page = result.pagination.page
    state.total = result.pagination.total
    state.products = [...state.products, ...(result.data as Product[])]
  } catch (error: any) {
    ElMessage.error(error.message || 'Erro inesperado')
  } finally {
    isLoadingProducts.value = false
  }
}

function nextPage() {
  if (state.page * LIMIT >= state.total) return
  state.page += 1
  searchProducts()
}

const goToEditProduct = (productId?: string) => {
  if (!productId) return
  navigateTo({ path: '/productPage', query: { _id: productId } })
}

async function deleteProduct(productId?: string) {
  if (!productId) return
  try {
    await ElMessageBox.confirm('Você quer realmente excluir o produto?', 'Atenção', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'el-button--danger',
    })
    await $fetch('/api/product/deleteProduct', {
      method: 'DELETE',
      body: { productId },
    })
    ElMessage.success('Produto excluído com sucesso!')
    searchProducts(true)
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('Erro ao excluir o produto.')
  }
}

// ── Usuários ──────────────────────────────────────────────

async function loadUsers() {
  try {
    isLoadingUsers.value = true
    const result = await $fetch('/api/user/listUsers', {
      method: 'GET',
      params: { page: usersPage.value, limit: USERS_LIMIT },
    })
    state.users = result.data as User[]
    usersTotal.value = result.pagination.total
  } catch {
    ElMessage.error('Erro ao carregar usuários')
  } finally {
    isLoadingUsers.value = false
  }
}

async function prevUsersPage() {
  if (usersPage.value <= 1) return
  usersPage.value -= 1
  await loadUsers()
}

async function nextUsersPage() {
  if (usersPage.value * USERS_LIMIT >= usersTotal.value) return
  usersPage.value += 1
  await loadUsers()
}

async function toggleKind(user: User) {
  const newKind = user.kind === 'admin' ? 'user' : 'admin'
  const label = newKind === 'admin' ? 'administrador' : 'usuário comum'

  try {
    await ElMessageBox.confirm(
      `Deseja tornar ${user.name} um ${label}?`,
      'Confirmar alteração',
      { confirmButtonText: 'Sim', cancelButtonText: 'Não' }
    )

    await $fetch('/api/user/updateKind', {
      method: 'PATCH',
      body: { userId: user._id, kind: newKind },
    })

    // Atualiza localmente sem recarregar tudo
    const index = state.users.findIndex(u => u._id === user._id)
    if (index !== -1) {
      state.users[index] = { ...state.users[index], kind: newKind } as User
    }

    ElMessage.success(`${user.name} agora é ${label}`)
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('Erro ao atualizar tipo do usuário')
  }
}
</script>

<style scoped>
.bg-cream { background: #F2EDE6; }

.adm-nav-link { cursor: pointer; }

.admin-sidebar { background: #F2EDE6; }

.adm-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.adm-nav li { border-bottom: 1px solid #ddd; }

.adm-nav li a {
  display: block;
  padding: 12px 15px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
}

.adm-nav li a:hover,
.adm-nav li a.active {
  background-color: #e9ecef;
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

.products-table th,
.products-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
}

.products-table th {
  font-weight: 600;
  color: #333;
}

.products-table tbody tr:last-child td { border-bottom: none; }

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

.edit-button,
.delete-button {
  border: none;
  background: transparent;
  padding: 6px;
}

.kind-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.kind-admin {
  background: #fdecea;
  color: #7A1F2E;
}

.kind-user {
  background: #e8f4fd;
  color: #1a5276;
}

.pagination-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.page-info {
  font-size: 13px;
  color: #6B6B6B;
}
</style>