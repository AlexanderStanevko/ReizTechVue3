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
      <template v-else>
        <ProductInformationDocumentList
          v-if="isMobile"
          :products="productList"
        />
        <ProductInformationTable
          v-else
          :productList="productList"
          class="products-page__table"
        />
      </template>

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
import ProductInformationDocumentList from 'components/Product/ProductInformationDocumentList.vue'
import AppSpinner from 'components/App/AppSpinner.vue'
import { useProductStore } from 'stores/ProductStore'
import { customDebounce, responsive } from 'utils'
import type { ProductItem } from 'types'

export default defineComponent({
  name: 'ProductsPage',
  components: {
    ProductInformationHeader,
    ProductInformationTable,
    AppSpinner,
    ProductInformationDocumentList,
  },
  setup() {
    const title = ref('')
    const brand = ref('')
    const isLoading = ref(false)
    const productStore = useProductStore()
    const productList = computed<ProductItem[]>(() => productStore.productList)

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

    const searchProductsByTitleOrBrand = customDebounce(async (query: string) => {
      isLoading.value = true
      try {
        const q = query.toLowerCase().trim()

        await productStore.searchProducts({
          q,
        })
      } catch (err) {
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }, 500)

    watch(
      [
        () => title.value,
        () => brand.value,
      ],
      async ([
        tValue,
        bValue,
      ]) => {
        if (!tValue && !bValue) {
          await fetchProducts()
          return
        }
        // So, the dummyJSON service provides poor search capabilities.
        // I can search only by one query string.
        // If I need to, say, search by brand, I pass brand as a parameter.
        // If I need a title, I pass the title as a parameter
        // If the user enters both parameters, the service will return nothing.
        // In this case, I will send a search query with the title parameter every time
        // (if both parameters are entered)
        // Since I don't want to disable one of the input fields for the user during the process
        if (tValue.length >= 3 || bValue.length >= 3) searchProductsByTitleOrBrand(tValue, bValue)
      },
    )

    onMounted(async () => {
      await fetchProducts()
    })

    return {
      ...responsive,
      title,
      brand,
      isLoading,
      productList,
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
