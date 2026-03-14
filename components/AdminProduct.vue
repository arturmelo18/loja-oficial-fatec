<template>
    <div class="content">
        <img :src="props.product.image" />
        <div class="flex justify-between flex-1 ml-1">
          <span>{{ props.product.name }}</span>
          <span>Preço: R${{ props.product.price }}</span>
          <span>Quantidade: {{ props.product.quantity }}</span>
        </div>
        <el-button class="edit-button" @click="goToEditProduct">Editar</el-button>
    </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/Product';


const props = defineProps<{
    product: Product
}>()

const goToEditProduct = () => {
  if (!props.product._id) return
  navigateTo({
    path: '/productPage',
    query: { _id: props.product._id },
  })
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