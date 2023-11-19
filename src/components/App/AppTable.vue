<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-if="selection !== 'none'"
scope="col">
            <input type="checkbox"
v-if="selection === 'multiple'"
@change="toggleAllRowsSelection" />
          </th>
          <th v-for="column in propColumns"
:key="column.name"
scope="col">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in internalRows"
:key="row[propRowKey]">
          <tr :class="{ 'is-selected': row.selected }">
            <td v-if="selection !== 'none'">
              <input type="checkbox"
v-model="row.selected"
@change="() => emitRowSelection(row)" />
            </td>
            <td v-for="column in propColumns"
:key="column.name">{{ row[column.name] }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, toRefs,
} from 'vue'
import type { Ref, PropType } from 'vue'

interface TableColumn {
  name: string;
  label: string;
}

interface TableRow {
  id: number | string;
  selected?: boolean;
  [key: string]: any;
}

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
  },
  emits: ['update:selection'],
  setup(props, { emit }) {
    const internalRows: Ref<TableRow[]> = ref([])
    const {
      rows: propRows,
      columns: propColumns,
      rowKey: propRowKey,
      selection: propSelection,
    } = toRefs(props)

    // Initialize internalRows with the propRows' values
    watch(propRows, (newRows) => {
      internalRows.value = newRows.map((row) => ({ ...row, selected: !!row.selected }))
    }, { immediate: true })

    const toggleAllRowsSelection = (event: Event) => {
      const isSelected = (event.target as HTMLInputElement).checked
      internalRows.value = internalRows.value.map((row) => ({
        ...row,
        selected: isSelected,
      }))
      emit('update:selection', internalRows.value.filter((r) => r.selected))
    }

    const emitRowSelection = (selectedRow: TableRow) => {
      let newRows: TableRow[]

      if (propSelection.value === 'single') {
        // Unselect all rows and then select the clicked row
        newRows = internalRows.value.map((row) => ({
          ...row,
          selected: row.id === selectedRow.id,
        }))
      } else {
        // Toggle the selection state of the clicked row
        newRows = internalRows.value.map((row) => (
          row.id === selectedRow.id
            ? { ...row, selected: !row.selected }
            : row
        ))
      }

      // Update internalRows with newRows
      internalRows.value = newRows

      // Emit the event with the new selection state
      emit('update:selection', newRows.filter((row) => row.selected))
    }

    return {
      propColumns,
      propRowKey,
      propSelection,
      internalRows,
      toggleAllRowsSelection,
      emitRowSelection,
    }
  },
})
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

th, td {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: white;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

tr.is-selected, tr.is-selected:hover {
  background-color: #e8eaf6;
}

input[type="checkbox"] {
  /* Стилизация чекбоксов, если требуется */
}

/* Дополнительные стили для заголовка и ячеек */
th:first-child, td:first-child {
  padding-left: 24px;
}

th:last-child, td:last-child {
  padding-right: 24px;
}

/* Стили для скроллбара, если таблица прокручивается */
::-webkit-scrollbar {
  height: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
