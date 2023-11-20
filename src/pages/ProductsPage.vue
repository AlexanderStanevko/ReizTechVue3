<template>
  <main class="products-page">
    <ProductInformationHeader
      v-model:titleValue="title"
      v-model:brandValue="brand"
      class="products-page__header"
    />
    <ProductInformationTable class="products-page__table"/>

  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductInformationHeader from 'components/Product/ProductInformationHeader.vue'
import ProductInformationTable from 'components/Product/ProductInformationTable.vue'

export default defineComponent({
  name: 'ProductsPage',
  components: {
    ProductInformationHeader,
    ProductInformationTable,
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
  &__header {
    margin-bottom: 30px;
  }
}
</style>
