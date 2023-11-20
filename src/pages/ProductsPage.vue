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
        class="products-page__loading-section"
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
  onMounted,
  watch,
} from 'vue'
import ProductInformationHeader from 'components/Product/ProductInformationHeader.vue'
import ProductInformationTable from 'components/Product/ProductInformationTable.vue'
import AppSpinner from 'components/App/AppSpinner.vue'
import { useProductStore } from 'stores/ProductStore'
import { customDebounce } from 'utils'
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
    const title = ref('')
    const brand = ref('')
    const isLoading = ref(false)
    const productStore = useProductStore()

    const fetchProducts = async () => {
      isLoading.value = true
      try {
        await productStore.fetchAllProducts()
      } catch (err) {
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    const searchProductsByTitleOrBrand = customDebounce(async () => {
      isLoading.value = true
      try {
        await productStore.searchProducts({
          q: `${title.value} ${brand.value}`.trim().toLowerCase(),
        })
      } catch (err) {
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }, 500) // Задержка debounce 500 мс

    watch([title, brand], () => {
      searchProductsByTitleOrBrand()
    })

    onMounted(fetchProducts)

    return {
      title,
      brand,
      isLoading,
      productList: computed(() => productStore.productList),
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

  &__loading-section {
    margin-top: 100px;
  }
  &__table {
    width: 100%;
  }
}
</style>
