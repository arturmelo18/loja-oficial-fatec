<template>
  <div
    class="page-container h-screen w-screen flex justify-center items-center"
  >
    <el-card class="content" :body-style="{ padding: '0px' }">
      <div class="title">
        <h1>Login</h1>
      </div>
      <div class="inputs mt-2 mb-2">
        <span class="mb-2">Digite seu email:</span>
        <el-input v-model="state.email" placeholder="Digite o seu email" />
        <span class="mt-2 mb-2">Digite sua senha:</span>
        <el-input
          v-model="state.password"
          placeholder="Digite a sua senha"
          :type="!isPasswordHidden ? 'password' : 'text'"
        />
        <el-checkbox v-model="isPasswordHidden"> Visualizar senha </el-checkbox>
      </div>
      <div class="mt-2 mb-2 buttons">
        <nuxt-link
          class="button inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-[#606266] transition-colors duration-200 bg-white border border-[#dcdfe6] rounded hover:text-[#409eff] hover:border-[#c6e2ff] hover:bg-[#ecf5ff] active:border-[#409eff] focus:outline-none"
          to="/createUser"
          >Criar usuário</nuxt-link
        >
        <el-button class="button" :disabled="isLoading" @click="authUser">
          Entrar
        </el-button>
      </div>
      <footer class="text-center pt-2 pb-2">
        LOF Todos os Direitos Reservados
      </footer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const state = reactive({
  email: "",
  password: "",
});

const isPasswordHidden = ref(false);
const isLoading = ref(false);

async function authUser() {
  isLoading.value = true;

  try {
    const response = await $fetch("/api/user/getUser", {
      method: "POST",
      body: {
        email: state.email,
        password: state.password,
      },
    });

    if (!response.auth) {
      ElMessage.error("Email ou senha incorretos.");
      return;
    }

    ElMessage.success("Autenticação realizada com sucesso!");

    await navigateTo("/homePage");
  } catch (error: any) {
    ElMessage.error(error.data?.statusMessage || "Erro na autenticação");
    console.error(error);
  } finally {
    isLoading.value = false;
  }
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  display: flex;
  align-items: center;
  background: #4a0f01;
  color: #ffffff;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
}

.inputs {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  width: 500px;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

.button {
  width: 200px;
}

footer {
  color: #b0b0b0;
  border-top: 1px solid #e7e7e7;
}
</style>
