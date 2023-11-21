<template>
  <tr :class="['app-table__row', { 'app-table__row--selected': row.selected }]">
    <td class="app-table__cell">
      <input
        type="checkbox"
        :checked="row.selected"
        @change="onCheckboxChange"
        class="app-table__checkbox"
      />
    </td>
    <td class="app-table__cell">
      <RouterLink :to="{ name: 'ProductPageDetails', params: { productId: row.id } }">
        {{ row.title }}
      </RouterLink>
    </td>
    <td class="app-table__cell">{{ row.category }}</td>
    <td class="app-table__cell">{{ row.brand }}</td>
    <td class="app-table__cell">{{ row.price }}</td>
    <td class="app-table__cell">{{ row.stock }}</td>
    <td class="app-table__cell">{{ row.rating }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ProductItem } from 'types'

export default defineComponent({
  name: 'ProductInformationTableRow',
  props: {
    row: {
      type: Object as PropType<ProductItem & { selected: boolean; }>,
      required: true,
    },
    selectionEnabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:selected'],
  setup(props, { emit }) {
    const onCheckboxChange = (event: Event) => {
      emit('update:selected', { ...props.row, selected: (event.target as HTMLInputElement).checked })
    }
    // const emitRowSelectionChanged = () => {
    //   emit('rowSelectionChanged', props.row)
    // }

    return {
      onCheckboxChange,
    }
  },
})
</script>

<style scoped lang="scss">
.app-table__cell a {
  text-decoration: none;
  color: var(--vt-c-primary);
}
</style>
