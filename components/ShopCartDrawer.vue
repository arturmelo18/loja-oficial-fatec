<template>
  <USlideover :dismissible="false" title="Carrinho de compras">
    <UButton color="neutral" variant="subtle" icon="i-lucide-shopping-cart" />

    <template #content>
      <div v-for="item in itens">
        <div>
          <h1>{{ item.name }}</h1>
          <h2>{{ item.price }}</h2>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script>
const itens = [
  {
    name: "item 1",
    price: "19,90",
  },
  {
    name: "item 2",
    price: "38,90",
  },
];
</script>
