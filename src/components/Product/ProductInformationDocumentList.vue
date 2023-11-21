<template>
  <div class="document-list">
    <template v-if="products.length">
      <ProductInformationDocumenListItem
        v-for="(item, itemIdx) in products"
        :key="`${itemIdx}_${item.id}`"
        :item="item"
        class="document-list__item"
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
import { defineComponent, type PropType } from 'vue'
import type { ProductItem } from 'types'
import ProductInformationDocumenListItem from 'components/Product/ProductInformationDocumenListItem.vue'

export default defineComponent({
  name: 'ProductInformationDocumentList',
  components: {
    ProductInformationDocumenListItem,
  },
  props: {
    products: {
      type: Array as PropType<ProductItem[]>,
      default: () => [],
    },
  },
  emits: ['onSelectLine'],
  setup() {
    return {
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
    margin-bottom: 20px; // Регулируйте в соответствии с вашим дизайном

    // Добавьте любые необходимые стили для карточек
  }

  &__no-info {
    text-align: center;
    padding: 20px;
    font-style: italic;
    color: #757575;
  }
}
</style>
