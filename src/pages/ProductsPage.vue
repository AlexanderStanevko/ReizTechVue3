<template>
  <main class="products-page">
    <ProductInformationHeader
      v-model:titleValue="title"
      v-model:brandValue="brand"
      class="products-page__header"
    />
    <div class="products-page__content">
      <AppSpinner
        v-if="isLoading"
        size="50px"
        topColor="#D0D0D0"
      />
    <ProductInformationTable
      v-else
      :productList="productList"
      class="products-page__table"
    />
    </div>
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
} from 'vue'
import ProductInformationHeader from 'components/Product/ProductInformationHeader.vue'
import ProductInformationTable from 'components/Product/ProductInformationTable.vue'
import AppSpinner from 'components/App/AppSpinner.vue'
import { useProductStore } from 'stores/ProductStore'
import type { ProductItem } from 'types'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ProductsPage',
  components: {
    ProductInformationHeader,
    ProductInformationTable,
    AppSpinner,
  },
  setup() {
    const route = useRoute()
    const productStore = useProductStore()
    const productList = computed<ProductItem[]>(() => productStore.productList)

    const title = ref('')
    const brand = ref('')
    const isLoading = ref(false)

    const fetchProducts = async () => {
      try {
        isLoading.value = true

        await productStore.fetchAllProducts()
      } catch (err) {
        console.log(err)
      } finally {
        isLoading.value = false
      }
    }

    watch(
      () => route.name,
      async (val) => {
        if (val === 'ProductsPage') await fetchProducts()
      },
      { immediate: true },
    )

    return {
      title,
      brand,
      productList,
      isLoading,
      fetchProducts,
    }
  },
})
</script>

<style lang="scss" scoped>
.products-page {
  &__header {
    margin-bottom: 30px;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
