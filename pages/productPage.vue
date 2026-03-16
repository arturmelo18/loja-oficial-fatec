<template>
    <div class="h-screen w-screen bg-white">
        <header class="flex justify-between items-center p-4">
            <h1>Tela do produto</h1>
            <div>
                <el-button @click="navigateTo('/adminPage')">Cancelar</el-button>
                <el-button :disabled="isLoading" @click="handleSave" type="info">Salvar</el-button>
            </div>
        </header>
        <GradientDivisor />
        <section class="mt-4 p-4 flex">
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
            <div class="ml-4 description flex-1">
                <p>Nome do produto:</p>
                <el-input placeholder="Digite o nome do produto" v-model="state.product.name"/>
                <p>Quantidade do produto</p>
                <el-input type="number" placeholder="Digite a quantidade do produto" v-model="state.product.quantity"/>
                <p>Preço do produto:</p>
                <el-input type="number" placeholder="Digite o preço do produto" v-model="state.product.price"/>
                <p>Descrição do produto</p> 
                <el-input class="h-18" placeholder="Digite a descrição do produto" v-model="state.product.description"/>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/Product'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'

const route = useRoute()
const isLoading = ref(false)
const selectedFile = ref<File | null>(null)

const state = reactive({
    product: {
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        image: ''
    } as Product,
    isNew: true
})

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}


onMounted(async () => {
    if (!route.query._id) return
    state.isNew = false
    try {
        state.product = await $fetch<Product>('/api/product/getProduct', {
            method: 'GET',
            params: { _id: route.query._id }
        })
    } catch (error) {
        ElMessage.error('Erro ao carregar produto')
    }
})

const handleSave = async () => {
    if (!state.product.name || !state.product.price) {
        ElMessage.warning('Preencha os campos obrigatórios')
        return
    }

    isLoading.value = true
    try {
        if (selectedFile.value) {
            state.product.image = await fileToBase64(selectedFile.value)
        }

        if (state.isNew) {
            await $fetch('/api/product/createProduct', {
              method: 'POST',
              body: state.product
            })
            ElMessage.success('Produto criado com sucesso!')
        } else {
            await $fetch('/api/product/updateProduct', {
              method: 'POST',
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
}

const handleImageChange = (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return

  if (uploadFile.raw.size / 1024 / 1024 > 2) {
    ElMessage.error('A foto não pode passar de 2MB')
    return
  }

  selectedFile.value = uploadFile.raw
  
  state.product.image = URL.createObjectURL(uploadFile.raw)
}
</script>

<style lang="css" scoped>
header { 
    background: #4a0f01;
    color: #ffffff;
}

header h1 {
    font-size: 30px;
    font-weight: 600;
}

.avatar-uploader :deep(.el-upload) {
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  cursor: pointer;
  width: 260px;
  height: 262px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c8c8c;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.description p {
    color: #3f3f3f;
}
</style>