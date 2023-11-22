<template>
  <div>
    <AppTable
      ref="appTableRef"
      :columns="tableColumns"
      :rows="productList"
      row-key="id"
      selection="multiple"
      :sortableColumns="['title', 'category']"
      v-model:selectedRows="selected"
    >
      <template #body="{ row }">
        <ProductInformationTableRow
          :row="row"
          @selectionChanged="(item) => handleRowSelectionChanged(item)"
        />
      </template>
    </AppTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import AppTable from 'components/App/AppTable.vue'
import ProductInformationTableRow from 'components/Product/ProductInformationTableRow.vue'
import type { ProductItem, TableRow } from 'types'
import type { Nullable } from 'utils'

interface AppTableMethods {
  emitRowSelection: (row: TableRow) => void;
}

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
    const appTableRef = ref<Nullable<AppTableMethods>>(null)
    const tableColumns = ref([
      { name: 'title', label: 'Title' },
      { name: 'category', label: 'Category' },
      { name: 'brand', label: 'Brand' },
      { name: 'price', label: 'Price' },
      { name: 'stock', label: 'Stock' },
      { name: 'rating', label: 'Rating' },
    ])
    const handleRowSelectionChanged = (
      updatedRow: TableRow,
    ) => {
      appTableRef.value?.emitRowSelection(updatedRow)
    }

    return {
      tableColumns,
      appTableRef,
      selected,
      handleRowSelectionChanged,
    }
  },
})
</script>
