<template>
  <nav class="flex space-between">
    <div class="nav-logo">
      <nuxt-link to="/homePage">Fatecano</nuxt-link>
    </div>
    <ul class="nav-links" id="nav-links-desktop">
      <li><nuxt-link to="/homePage">Todos os produtos</nuxt-link></li>
    </ul>
    <el-dropdown>
      <el-button text type="info">
        <i class="uil uil-bars"></i>
      </el-button>
      <template #dropdown> 
        <div class="flex flex-col items-start">
          <el-dropdown-item class="w-full" @click="navigateTo('/')" v-if="authStore.getUser">
            Minha Conta
          </el-dropdown-item>
          <el-dropdown-item class="w-full" @click="logout" v-if="authStore.getUser">
            <span>Sair</span>
          </el-dropdown-item>
          <el-dropdown-item class="w-full" @click="navigateTo('/adminPage')" v-if="authStore.getUser?.kind == 'admin'">
            <span>Área do administrador</span>
          </el-dropdown-item>
        </div>
      </template>
    </el-dropdown>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const logout = () => {
  authStore.clearUser()
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
