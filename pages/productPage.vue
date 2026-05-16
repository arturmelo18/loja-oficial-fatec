<template>
    <div class="min-h-screen w-screen bg-cream pb-10">
        <header class="flex justify-between items-center p-4">
            <h1>{{ state.isNew ? 'Novo Produto' : 'Editar Produto' }}</h1>
            <div>
                <el-button @click="navigateTo('/adminPage')">Cancelar</el-button>
                <el-button :disabled="isLoading" @click="handleSave" type="info">Salvar</el-button>
            </div>
        </header>
        <GradientDivisor />
        
        <main class="main-container">
            <section class="content-card">
                <!-- Coluna da Imagem -->
                <div class="image-column">
                    <el-upload
                        class="avatar-uploader"
                        action="#" 
                        :show-file-list="false"
                        :auto-upload="false" 
                        :on-change="handleImageChange"
                    >
                        <img v-if="state.product.image" :src="state.product.image" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </div>

                <!-- Coluna do Formulário -->
                <div class="form-column">
                    <div class="form-item">
                        <label for="product-name">Nome do produto</label>
                        <el-input id="product-name" placeholder="Digite o nome do produto" v-model="state.product.name"/>
                    </div>
                    <div class="form-item">
                        <label for="product-quantity">Quantidade do produto</label>
                        <el-input id="product-quantity" :min="1" type="number" placeholder="Digite a quantidade" v-model="state.product.quantity"/>
                    </div>
                    <div class="form-item">
                        <label for="product-price">Preço do produto (R$)</label>
                        <el-input id="product-price" :min="1" type="number" placeholder="Digite o preço" v-model="state.product.price"/>
                    </div>
                    <div class="form-item">
                        <label for="product-description">Descrição do produto</label> 
                        <el-input id="product-description" :rows="4" type="textarea" placeholder="Digite a descrição" v-model="state.product.description"/>
                    </div>
                    <div class="form-item-horizontal">
                        <label for="product-active">Habilitar produto na loja</label>
                        <el-tooltip content="Habilita ou desabilita seu produto na loja" placement="top">
                            <span class="help-icon">?</span>
                        </el-tooltip>
                        <el-switch id="product-active" v-model="state.product.active" style="--el-switch-on-color: #4a0f01;"/>
                    </div>
                </div>
            </section>
        </main>
        
        <LofFooter />
    </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/types/Product";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { UploadFile } from "element-plus";

const route = useRoute();
const isLoading = ref(false);
const selectedFile = ref<File | null>(null);

definePageMeta({
  middleware: 'auth',
})

const state = reactive({
  product: {
    name: "",
    price: 1,
    quantity: 1,
    description: "",
    image: "",
    active: true,
  } as Product,
  isNew: true,
});

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};


onMounted(async () => {
    if (!route.query._id) return
    state.isNew = false
    try {
        const result = await $fetch<Product>('/api/product/getProduct', {
            method: 'GET',
            params: { _id: route.query._id }
        })
        state.product = result
    } catch (error) {
        ElMessage.error('Erro ao carregar produto')
    }
})

const handleSave = async () => {
  if (!state.product.name || !state.product.price) {
    ElMessage.warning("Preencha os campos obrigatórios");
    return;
  }

  isLoading.value = true;
  try {
    if (selectedFile.value) {
      state.product.image = await fileToBase64(selectedFile.value);
    }

    if (state.isNew) {
        await $fetch('/api/product/createProduct', {
          method: 'POST',
          body: state.product
        })
        ElMessage.success('Produto criado com sucesso!')
    } else {
        await $fetch('/api/product/updateProduct', {
          method: 'PUT',
          body: state.product
        })
        ElMessage.success('Produto atualizado com sucesso!')
    }
    
    navigateTo('/adminPage')
    
  } catch (e: any) {
    console.error(e)
    ElMessage.error(e.statusMessage || 'Erro ao salvar')
  } finally {
    isLoading.value = false
  }
};

const handleImageChange = (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return;

  if (uploadFile.raw.size / 1024 / 1024 > 2) {
    ElMessage.error("A foto não pode passar de 2MB");
    return;
  }

  selectedFile.value = uploadFile.raw;
  state.product.image = URL.createObjectURL(uploadFile.raw);
};
</script>

<style lang="css" scoped>
.bg-cream {
  background: #F2EDE6;
}

header {
  background: #4a0f01;
  color: #ffffff;
}

header h1 {
  font-size: 24px;
  font-weight: 600;
}

.main-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.content-card {
  display: flex;
  gap: 2rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.image-column {
  flex: 0 0 40%;
}

.form-column {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-item label, .form-item-horizontal label {
  margin-bottom: 0.5rem;
  color: #3f3f3f;
  font-size: 14px;
}

.form-item-horizontal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.help-icon {
  background-color: #e9ecef;
  color: #495057;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: help;
  font-size: 12px;
}

.avatar-uploader :deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 100%; /* Aspect ratio 1:1 */
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: #4a0f01;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>