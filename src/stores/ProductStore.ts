import { defineStore } from 'pinia'

interface ProductState {
  isLoading: boolean;
  productList: Array<string>;
}

export const useProductStore = defineStore({
  id: 'ProductStore',

  state: () => ({
    isLoading: false,
    productList: [],
  } as ProductState),

  getters: {

  },
  actions: {

  },
})
