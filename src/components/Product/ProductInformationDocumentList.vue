<template>
  <div class="document-list">
    <template v-if="products.length">
      <AppButton
        :buttonText="selectAllText"
        class="mb-30"
        @click="onSelectAll"
      />
      <ProductInformationDocumenListItem
        v-for="(item, itemIdx) in products"
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
  defineComponent, type PropType, ref, computed,
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

    return {
      selectedCards,
      selectAllText,
      onSelectItem,
      onSelectAll,
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
}
</style>
