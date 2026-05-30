<template>
  <div class="h-screen w-screen flex justify-center items-center bg-cream">
    <div class="modal-box auth-modal-box">
      <div class="auth-body">
        <div class="auth-title">Bem-vindo</div>
        <div class="auth-sub">Entre na sua conta</div>
        
        <div class="form-grp">
          <label>E-mail</label>
          <el-input 
            v-model="state.email"
            type="email"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label>Senha</label>
          <el-input 
            v-model="state.password"
            :type="!isPasswordHidden ? 'password' : 'text'"
            placeholder="••••••••"
          />
        </div>
        
        <div class="flex items-center gap-2 mb-4">
          <label for="show-pass" class="text-sm text-gray-600">Visualizar senha</label>
          <el-checkbox
            id="show-pass"
            v-model="isPasswordHidden"
            type="checkbox"
            class="w-4 h-4"
          />
        </div>

        <button class="btn btn-dark w-full mb-4 enter-button" :disabled="isLoading" @click="authUser">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
        
        <div class="text-center">
          <span class="text-sm text-gray-600">Não tem conta? </span>
          <nuxt-link to="/createUser" class="text-burgundy font-semibold">Criar agora</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/User'

const state = reactive({
  email: '',
  password: '',
})

const isPasswordHidden = ref(false)
const isLoading = ref(false)
const authStore = useAuthStore()

async function authUser() {
  if (!state.email || !state.password) {
    ElMessage.error('Preencha todos os campos')
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch<User>('/api/user/authUser', {
      method: 'POST',
      body: {
        email: state.email,
        password: state.password,
      },
    })

    if (!response) {
      ElMessage.error('Email ou senha incorretos.')
      return
    }

    authStore.setUser(response)
    ElMessage.success('Autenticação realizada com sucesso!')
    
    await navigateTo('/')
  }
  catch (error: any) {
    ElMessage.error(error.data?.statusMessage || 'Erro na autenticação')
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.bg-cream {
  background: #F2EDE6;
}

el-input {
  width: 100%;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
.enter-button {
  margin-top: 10px;
}
</style>
