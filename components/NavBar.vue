<template>
  <nav class="flex space-between">
    <div class="nav-logo">
      <nuxt-link to="/">Fatecano</nuxt-link>
    </div>
    <ul class="nav-links" id="nav-links-desktop">
      <li><nuxt-link to="/">Todos os produtos</nuxt-link></li>
    </ul>
    <div>
      <el-button text type="info" @click="navigateTo('/cartPage')">
        <i class="uil uil-shopping-cart-alt"></i>
      </el-button>
      <el-dropdown>
        <el-button text type="info">
          <i class="uil uil-bars"></i>
        </el-button>
        <template #dropdown> 
            <div class="flex flex-col items-start" v-if="authStore.getUser">
              <el-dropdown-item class="w-full" @click="navigateTo('/')">
                <i class=" uil uil-user"/>
                <span>Minha Conta</span>
              </el-dropdown-item>
              <el-dropdown-item class="w-full" @click="navigateTo('/adminPage')" v-if="authStore.getUser?.kind == 'admin'">
                <i class="uil uil-setting"></i>
                <span>Área do administrador</span>
              </el-dropdown-item>
              <el-dropdown-item class="w-full" @click="logout">
                <i class="uil uil-signout"></i>
                <span>Sair</span>
              </el-dropdown-item>
            </div>
            <div class="flex flex-col items-start" v-else>
              <el-dropdown-item class="w-full" @click="navigateTo('/loginPage')"">
                <i class="uil uil-signin"></i>
                <span>Entrar</span>
              </el-dropdown-item>
            </div>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const logout = () => {
  authStore.clearUser()
  ElMessage.success('O usuário saiu da conta com sucesso!')
  navigateTo('/')
}
</script>

<style scoped>
nav a {
  text-decoration: none;
  color: inherit;
}

.nav-logo a {
  text-decoration: none;
  color: inherit;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: transparent;
  color: var(--burgundy);
}
</style>
