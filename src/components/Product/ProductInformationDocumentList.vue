<template>
  <div class="document-list">
    <template v-if="products.length">
      <div class="document-list__sort-header">
        <span class="document-list__sort-label">Sort By:</span>
        <AppButton
          buttonText="Title"
          class="document-list__sort-button"
          @click="sortBy('title')"
        />
        <AppButton
          buttonText="Brand"
          class="document-list__sort-button"
          @click="sortBy('brand')"
        />
      </div>
      <AppButton
        :buttonText="selectAllText"
        class="mb-30"
        @click="onSelectAll"
      />
      <ProductInformationDocumenListItem
        v-for="(item, itemIdx) in sortedProducts"
        :key="`${itemIdx}_${item.id}`"
        :item="item"
        :isSelected="selectedCards.includes(item)"
        class="document-list__item"
        @selectItem="onSelectItem"
      />
    </template>
    <template v-else>
      <p class="document-list__no-info">
        No information found
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  type PropType,
  ref,
  computed,
  watch,
} from 'vue'
import type { ProductItem } from 'types'
import ProductInformationDocumenListItem from 'components/Product/ProductInformationDocumenListItem.vue'
import AppButton from 'components/App/AppButton.vue'

export default defineComponent({
  name: 'ProductInformationDocumentList',
  components: {
    ProductInformationDocumenListItem,
    AppButton,
  },
  props: {
    products: {
      type: Array as PropType<ProductItem[]>,
      default: () => [],
    },
  },
  emits: ['selectItem'],
  setup(props, { emit }) {
    const selectedCards = ref<ProductItem[]>([])
    const sortedProducts = ref<ProductItem[]>([])
    const sortDirection = ref<'asc' | 'desc'>('asc')
    const currentSortField = ref<'title' | 'brand' | ''>('')

    const isAllSelected = computed(() => selectedCards.value.length === props.products.length)

    const selectAllText = computed(() => (isAllSelected.value ? 'Unselect All' : 'Select All'))

    const onSelectItem = (item: ProductItem) => {
      const index = selectedCards.value.findIndex((selectedItem) => selectedItem.id === item.id)
      if (index === -1) {
        selectedCards.value.push(item)
      } else {
        selectedCards.value.splice(index, 1)
      }
      emit('selectItem', selectedCards.value)
    }

    const onSelectAll = () => {
      if (selectedCards.value.length !== props.products.length) {
        selectedCards.value = [...props.products]
      } else {
        selectedCards.value = []
      }
      emit('selectItem', selectedCards.value)
    }

    const sortBy = (field: 'title' | 'brand') => {
      if (currentSortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        currentSortField.value = field
        sortDirection.value = 'asc'
      }
      sortedProducts.value = [...props.products].sort((a, b) => (sortDirection.value === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field])))
    }

    watch(
      () => props.products,
      (newProducts) => {
        sortedProducts.value = newProducts
      },

      { immediate: true },
    )

    return {
      selectedCards,
      selectAllText,
      sortedProducts,
      onSelectItem,
      onSelectAll,
      sortBy,
    }
  },
})
</script>

<style lang="scss" scoped>
.document-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;

  &__item {
    margin-bottom: 20px;

  }

  &__no-info {
    text-align: center;
    padding: 20px;
    font-style: italic;
    color: var(--vt-c-divider-dark-2);
  }

  &__sort-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__sort-label {
    margin-right: 10px;
    font-weight: bold;
    font-size: 1.1em;
  }

  &__sort-button {
    margin-right: 10px;
  }

  &__select-all {
    margin-bottom: 20px;
  }
}
</style>
