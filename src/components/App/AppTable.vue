<template>
  <div class="app-table">
    <table class="app-table__table">
      <thead class="app-table__header">
        <tr class="app-table__row">
          <th
            v-if="selection !== 'none'"
            class="app-table__cell app-table__cell--header"
            scope="col"
          >
            <input
              type="checkbox"
              v-if="selection === 'multiple'"
              v-model="areAllRowsSelected"
              @change="toggleAllRowsSelection"
              class="app-table__checkbox"
            />
          </th>
          <th
            v-for="column in propColumns"
            :key="column.name"
            class="app-table__cell app-table__cell--header"
            @click="sortableColumns.includes(column.name) && toggleSort(column.name)"
            scope="col"
          >
            {{ column.label }}
            <span v-if="sortableColumns.includes(column.name)">
              {{
                sortState.column === column.name
                  ? sortState.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''
              }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="app-table__body">
        <template
          v-for="row in sortedRows"
          :key="row[propRowKey]"
        >
          <slot
            name="body"
            :row="row"
          >
            <tr :class="['app-table__row', { 'app-table__row--selected': row.selected }]">
              <td
                v-if="selection !== 'none'"
                class="app-table__cell"
              >
                <input
                  type="checkbox"
                  :checked="row.selected"
                  @change="() => handleCheckboxChange(row)"
                  class="app-table__checkbox"
                />
              </td>
              <td
                v-for="column in propColumns"
                :key="column.name"
                class="app-table__cell"
              >
                {{ row[column.name] }}
              </td>
            </tr>
          </slot>
        </template>
        <tr
          v-if="sortedRows.length === 0"
          class="app-table__row app-table__row--nodata"
        >
          <td :colspan="propColumns.length + (selection !== 'none' ? 1 : 0)">
            <slot name="nodata">
              <div class="app-table__nodata-content">
                <img
                  src="@/assets/svg/attention-svgrepo-com.svg"
                  alt="Attention"
                  class="app-table__nodata-image"
                />
                There is nothing to display
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, watch, toRefs,
} from 'vue'
import type { PropType } from 'vue'
import type { TableColumn, TableRow } from 'types'

export default defineComponent({
  name: 'AppTable',
  props: {
    rows: {
      type: Array as PropType<TableRow[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => [],
    },
    rowKey: {
      type: String as PropType<keyof TableRow>,
      default: 'id',
    },
    selection: {
      type: String as PropType<'none' | 'single' | 'multiple'>,
      default: 'none',
    },
    sortableColumns: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    selectedRows: {
      type: Array as PropType<TableRow[]>,
      default: () => [],
    },
  },
  emits: ['update:selectedRows'],
  setup(props, { emit, expose }) {
    const {
      rows: propRows,
      columns: propColumns,
      rowKey: propRowKey,
      selection: propSelection,
    } = toRefs(props)
    const internalRows = ref<TableRow[]>([])
    const sortState = ref({ column: '', direction: 'asc' })
    const areAllRowsSelected = computed({
      get: () => internalRows.value.every((row) => row.selected),
      set: (value) => {
        internalRows.value = internalRows.value.map((row) => ({ ...row, selected: value }))
      },
    })

    const sortedRows = computed(() => {
      if (!sortState.value.column) {
        return internalRows.value
      }
      return [...internalRows.value].sort((a, b) => {
        if (a[sortState.value.column] < b[sortState.value.column]) {
          return sortState.value.direction === 'asc' ? -1 : 1
        }
        if (a[sortState.value.column] > b[sortState.value.column]) {
          return sortState.value.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    })

    const toggleSort = (column: string) => {
      if (sortState.value.column === column) {
        sortState.value.direction = sortState.value.direction === 'asc' ? 'desc' : 'asc'
      } else {
        sortState.value.column = column
        sortState.value.direction = 'asc'
      }
    }

    const toggleAllRowsSelection = () => {
      internalRows.value = internalRows.value.map((row) => ({
        ...row,
        selected: areAllRowsSelected.value,
      }))
      emit('update:selectedRows', internalRows.value.filter((r) => r.selected))
    }

    const emitRowSelection = (selectedRow: TableRow) => {
      if (propSelection.value === 'none') return

      if (propSelection.value === 'single') {
        internalRows.value = internalRows.value.map((row) => ({
          ...row,
          selected: row.id === selectedRow.id,
        }))
        emit('update:selectedRows', selectedRow.selected ? [selectedRow] : [])
      } else {
        internalRows.value = internalRows.value.map((row) => (
          row.id === selectedRow.id ? { ...row, selected: !row.selected } : row
        ))
        const updatedSelectedRows = internalRows.value.filter((row) => row.selected)
        emit('update:selectedRows', updatedSelectedRows)
      }
    }

    const handleCheckboxChange = (row: TableRow) => {
      const updatedRow = { ...row, selected: !row.selected }
      emitRowSelection(updatedRow)
    }

    expose({
      emitRowSelection,
    })

    watch(
      () => propRows.value,
      (newRows) => {
        internalRows.value = newRows.map((row) => ({ ...row, selected: !!row.selected }))
      },
      { immediate: true },
    )

    watch(
      () => props.selectedRows,
      (newSelectedRows) => {
        internalRows.value = internalRows.value.map((row) => {
          const isSelected = newSelectedRows.some((selectedRow) => selectedRow.id === row.id)
          return { ...row, selected: isSelected }
        })
      },
      { immediate: true },
    )

    return {
      propColumns,
      propRowKey,
      propSelection,
      internalRows,
      sortedRows,
      sortState,
      areAllRowsSelected,
      handleCheckboxChange,
      toggleAllRowsSelection,
      emitRowSelection,
      toggleSort,
    }
  },
})
</script>

<style lang="scss">
.app-table {
  &__table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &__header, &__body {

  }

  &__row {
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    &--selected, &--selected:hover {
      background-color: #eeeff3;
    }

    &--nodata {
      text-align: center;
      color: #757575;
      font-style: italic;
    }
  }

  &__nodata-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__cell {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;

    &--header {
      cursor: pointer;
      background-color: white;
      font-weight: bold;
    }
  }

  &__checkbox {
    cursor: pointer;
  }

  &__cell:first-child, &__cell:last-child {
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>
