<template>
  <div class="flex-row justify-center">
    <AppSpinner
      v-if="isLoading"
      size="50px"
      topColor="#D0D0D0"
      class=""
    />
    <div
      v-else
      class="json-renderer"
    >
      {{ product }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from 'vue'
import { useProductStore } from 'stores/ProductStore'
import { type Nullable } from 'utils'
import type { ProductItem } from 'types'
import { useRoute } from 'vue-router'
import AppSpinner from 'components/App/AppSpinner.vue'

export default defineComponent({
  name: 'ProductPageDetails',
  components: {
    AppSpinner,
  },
  setup() {
    const productStore = useProductStore()
    const route = useRoute()
    const isLoading = ref(false)
    const product = computed<Nullable<ProductItem>>(() => productStore.selectedProduct)

    const fetchProduct = async () => {
      isLoading.value = true
      try {
        const productId = route.params?.productId.toString()
        await productStore.fetchSingleProduct(productId)
      } catch (err) {
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(async () => {
      await fetchProduct()
    })

    return {
      isLoading,
      product,
    }
  },
})
</script>
<style scoped lang="scss">
.json-renderer {
  white-space: pre-wrap;
}
</style>
