<template>
  <div>
    <AppTable
      :columns="tableColumns"
      :rows="tableRows"
      row-key="id"
      selection="multiple"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppTable from 'components/App/AppTable.vue'

export default defineComponent({
  name: 'ProductInformationTable',
  components: {
    AppTable,
  },
  setup() {
    const tableColumns = ref([
      { name: 'title', label: 'Title' },
      { name: 'category', label: 'Category' },
      { name: 'brand', label: 'Brand' },
      { name: 'price', label: 'Price' },
      { name: 'stock', label: 'Stock' },
      { name: 'rating', label: 'Rating' },
    ])

    const tableRows = ref([
      {
        id: 1, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 2, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 3, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 4, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 5, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 6, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 7, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 8, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 9, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 10, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 11, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 12, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 13, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 14, title: 'iPhone 9', category: 'smartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
    ])

    return {
      tableColumns,
      tableRows,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
