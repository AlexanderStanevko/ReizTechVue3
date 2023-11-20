import { defineStore } from 'pinia'
import type { ProductItem } from 'types'
import type { FetchAllProductsResponse } from 'types/response'
import { handleAPIRequest } from 'utils'
import type { Nullable } from 'utils'

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

      if (res.products.length) {
        this.productList = res.products
      }
    },

    async fetchExactProduct() {
      const res = await handleAPIRequest<ProductItem[], unknown>({})

      if (res.length) {
        this.productList = res
      }
    },

    async searchProducts() {
      const res = await handleAPIRequest<ProductItem, unknown>({})

      if (res) {
        this.selectedProduct = res
      }
    },
  },
})
