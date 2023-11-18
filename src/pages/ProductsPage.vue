<template>
  <main class="products-page">
    <ProductInformationHeader
      v-model:titleValue="title"
      v-model:brandValue="brand"
    />
    <!-- Здесь могут быть другие компоненты или контент -->
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductInformationHeader from 'components/Product/ProductInformationHeader.vue'

export default defineComponent({
  name: 'ProductsPage',
  components: {
    ProductInformationHeader,
  },
  setup() {
    const title = ref('')
    const brand = ref('')

    return {
      title,
      brand,
    }
  },
})
</script>

<style lang="scss" scoped>
.products-page {
  /* Ваши стили для страницы продуктов */
}
</style>
