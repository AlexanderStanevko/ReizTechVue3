<template>
  <div>
    <AppTable
      :columns="tableColumns"
      :rows="tableRows"
      row-key="id"
      selection="multiple"
      :sortableColumns="['title', 'category']"
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
        id: 1, title: 'asdad 9', category: 'amartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 2, title: 'ghfghfg 9', category: 'bmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 3, title: 'rtyry 9', category: 'cmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 4, title: 'rtyrty 9', category: 'dmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 5, title: 'xcvxv 9', category: 'emartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 6, title: 'iPcxvcxvhone 9', category: 'fmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 7, title: 'ttt 9', category: 'gmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 8, title: 'uioui 9', category: 'vmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 9, title: 'cxv 9', category: 'xmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 10, title: 'iPhone 9', category: 'ymartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 11, title: 'iPhone 9', category: 'rmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
      },
      {
        id: 12, title: 'iPhone 9', category: 'tmartphones', brand: 'Samsung', price: '$100', stock: '50', rating: '$000',
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
