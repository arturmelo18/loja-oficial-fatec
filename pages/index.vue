<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <el-card
      class="content"
      :body-style="{ padding: '0px' }"
    >
      <div class="title">
        <h1>Login</h1>
      </div>
      <div class="inputs mt-2 mb-2">
        <span class="mb-2">Digite seu email:</span>
        <el-input
          v-model="state.email"
          placeholder="Digite o seu email"
        />
        <span class="mt-2 mb-2">Digite sua senha:</span>
        <el-input
          v-model="state.password"
          placeholder="Digite a sua senha"
          :type="isPasswordHidden ? 'password' : 'text'"
        />
      </div>
      <div class="mt-2 mb-2 flex justify-center">
        <el-button>Entrar</el-button>
      </div>
      <footer class="text-center pt-2 pb-2">
        LOF Todos os Direitos Reservados
      </footer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const state = reactive({
  email: '',
  password: '',
})

const isPasswordHidden = ref(false)
</script>

<style lang="css" scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.title {
    display: flex;
    align-items: center;
    background: #4A0F01;
    color: #ffffff;
    height: 50px;
    font-size: 20px;
    padding-left: 10px;
}

.inputs {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 20px;
    width: 500px;
}
footer {
    color: #B0B0B0;
    border-top: 1px solid #e7e7e7;
}
</style>
