<template>
  <div class="page-container">
    <el-card
      class="content"
      :body-style="{ padding: '0px' }"
    >
      <div class="title">
        <h1>Cadastro de usuário</h1>
      </div>

      <div class="user-information">
        <el-input
          v-model="state.name"
          placeholder="Nome completo"
        />
        <el-input
          v-model="state.email"
          placeholder="E-mail"
          type="email"
        />
        <el-input
          v-model="state.password"
          placeholder="Digite a sua senha"
          :type="!isPasswordHidden ? 'password' : 'text'"
        />

        <el-checkbox v-model="isPasswordHidden">
          Visualizar senha
        </el-checkbox>

        <el-input
          v-model="state.zipCode"
          placeholder="CEP"
          maxlength="9"
          @input="formatZipCode"
          @blur="searchAddress"
        />
        <el-input
          v-model="state.state"
          placeholder="Estado"
        />
        <el-input
          v-model="state.city"
          placeholder="Cidade"
        />
        <el-input
          v-model="state.neighborhood"
          placeholder="Bairro"
        />
        <el-input
          v-model="state.street"
          placeholder="Rua"
        />
        <el-input
          v-model="state.number"
          placeholder="Número"
        />
        <el-input
          v-model="state.complement"
          placeholder="Complemento (opcional)"
        />
      </div>

      <div class="flex justify-center items-center mb-2 mt-2">
        <el-button
          :disabled="isLoading"
          @click="createUser"
        >
          Cadastrar usuário
        </el-button>
      </div>

      <footer>
        LOF Todos os Direitos Reservados
      </footer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { ViaCep } from '~/types/ViaCep'

const state = reactive({
  name: '',
  email: '',
  password: '',
  zipCode: '',
  state: '',
  city: '',
  neighborhood: '',
  street: '',
  number: '',
  complement: '',
})

const isPasswordHidden = ref(false)
const isLoading = ref(false)

const formatZipCode = (value: string) => {
  if (!value) {
    state.zipCode = ''
    return
  }

  let cep = value.replace(/\D/g, '')

  if (cep.length > 8) {
    cep = cep.slice(0, 8)
  }

  cep = cep.replace(/^(\d{5})(\d)/, '$1-$2')

  state.zipCode = cep
}

async function createUser() {
  if (!state.name || !state.email || !state.password || !state.zipCode || !state.state || !state.city || !state.neighborhood || !state.street || !state.number) {
    ElMessage.error('Todos os campos obrigatórios devem ser preenchidos.')
    return
  }

  isLoading.value = true

  try {
    await $fetch('/api/user/createUser', {
      method: 'POST',
      body: {
        name: state.name,
        email: state.email,
        password: state.password,
        zipcode: state.zipCode,
        state: state.state,
        city: state.city,
        neighborhood: state.neighborhood,
        street: state.street,
        number: state.number,
        complement: state.complement,
      },
    })

    ElMessage.success('Usuário criado com sucesso!')

    await navigateTo('/')
  }
  catch (error: any) {
    ElMessage.error(error.data?.statusMessage || 'Erro ao criar usuário')
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}
async function searchAddress() {
  const cleanZipCode = state.zipCode.replace(/\D/g, '')

  const viaCepResponse: ViaCep = await $fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)

  if (viaCepResponse.erro) {
    ElMessage.error('CEP não encontrado')
    return
  }

  state.state = viaCepResponse.uf!
  state.city = viaCepResponse.localidade!
  state.neighborhood = viaCepResponse.bairro!
  state.street = viaCepResponse.logradouro!
}
</script>

<style lang="css" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f9fafb;
}

.content {
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 95vw;
}

.title {
  display: flex;
  align-items: center;
  background: #4A0F01;
  color: #ffffff;
  height: 50px;
  padding-left: 15px;
}

.title h1 {
  font-size: 20px;
  font-weight: normal;
  margin: 0;
}

.user-information {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px 30px 10px 30px;
}

footer {
  color: #B0B0B0;
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
}
</style>
