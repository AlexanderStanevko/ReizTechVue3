import { defineStore } from 'pinia'
import type { ProductItem } from 'types'
import type { FetchAllProductsResponse } from 'types/response'
import type { SearchProductsRequest } from 'types/request'
import { handleAPIRequest, type Nullable } from 'utils'

interface ProductState {
  isLoading: boolean;
  productList: Array<ProductItem>;
  selectedProduct: Nullable<ProductItem>
}

export const useProductStore = defineStore({
  id: 'ProductStore',

  state: () => ({
    isLoading: false,
    productList: [],
    selectedProduct: null,
  } as ProductState),

  getters: {

  },
  actions: {
    async fetchAllProducts() {
      const res = await handleAPIRequest<FetchAllProductsResponse, unknown>({})

      if (res.products) {
        this.productList = res.products
      }
    },

    async fetchSingleProduct(productId: string) {
      const res = await handleAPIRequest<ProductItem, unknown>({
        controller: `products/${productId}`,
      })

      if (res) {
        this.selectedProduct = res
      }
    },

    async searchProducts(request: SearchProductsRequest) {
      const res = await handleAPIRequest<FetchAllProductsResponse, SearchProductsRequest>({
        controller: 'products/search',
        params: { ...request },
      })

      if (res.products) {
        this.productList = res.products
      }
    },
  },
})
