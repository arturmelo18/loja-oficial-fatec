<template>
    <div class="content mt-1">
        <img :src="props.product.image" />
        <div class="flex justify-between flex-1 ml-1">
          <span>{{ props.product.name }}</span>
          <span>Preço: R${{ props.product.price }}</span>
          <span>Quantidade: {{ props.product.quantity }}</span>
        </div>
        <el-button class="edit-button" @click="goToEditProduct">Editar</el-button>
        <el-button class="edit-button mx-1" @click="deleteProduct">
            <i class="uil uil-trash-alt text-red-800 text-2xl"></i>
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/Product';

const props = defineProps<{
    product: Product
}>()

const emit = defineEmits(['updatePage'])

const goToEditProduct = () => {
  if (!props.product._id) return
  navigateTo({
    path: '/productPage',
    query: { _id: props.product._id },
  })
}

async function deleteProduct() {
    await ElMessageBox.confirm(
        'Você quer realmente excluir o produto?',
        'Atenção',
            {
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                confirmButtonClass: 'el-button--danger',
            }
        )
    
    await $fetch('/api/product/deleteProduct', {
        method: 'DELETE',
        body: {
            productId: props.product._id
        }
    })

    emit('updatePage')
}
</script>

<style lang="css" scoped>
.content {
    display: flex;
    border-radius: 999px;
    border: 1px solid #919191;
    align-items: center;
    justify-content: space-between;
}

.content img {
    width: 50px;
    height: 50px;
    border-radius: 999px;
    margin: 1px;
}

.edit-button {
    border: 1px solid #ffffff;
    border-radius: 999px;
    height: 50px;
}
</style>