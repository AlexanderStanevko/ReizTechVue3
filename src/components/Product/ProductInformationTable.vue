<template>
  <div>
    <AppTable
      :columns="tableColumns"
      :rows="productList"
      row-key="id"
      selection="single"
      :sortableColumns="['title', 'category']"
      v-model:selectedRows="selected"
    >
      <template #body="{ row }">
        <ProductInformationTableRow
          :row="row"
          @selectionChanged="handleRowSelectionChanged"
        />
      </template>
    </AppTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import AppTable from 'components/App/AppTable.vue'
import ProductInformationTableRow from 'components/Product/ProductInformationTableRow.vue'
import type { ProductItem } from 'types'

export default defineComponent({
  name: 'ProductInformationTable',
  components: {
    AppTable,
    ProductInformationTableRow,
  },
  props: {
    productList: {
      type: Array as PropType<ProductItem[]>,
    },
  },
  setup() {
    const selected = ref<ProductItem[]>([])
    const tableColumns = ref([
      { name: 'title', label: 'Title' },
      { name: 'category', label: 'Category' },
      { name: 'brand', label: 'Brand' },
      { name: 'price', label: 'Price' },
      { name: 'stock', label: 'Stock' },
      { name: 'rating', label: 'Rating' },
    ])

    const handleRowSelectionChanged = (updatedRow: ProductItem & { selected: boolean }) => {
      const existingIndex = selected.value.findIndex((item) => item.id === updatedRow.id)
      if (updatedRow.selected && existingIndex === -1) {
        selected.value = [...selected.value, updatedRow]
      } else if (!updatedRow.selected && existingIndex !== -1) {
        selected.value = [
          ...selected.value.slice(0, existingIndex),
          ...selected.value.slice(existingIndex + 1),
        ]
      }
    }

    return {
      tableColumns,
      selected,
      handleRowSelectionChanged,
    }
  },
})
</script>

<style lang="scss" scoped>
/* Ваши стили */
</style>
