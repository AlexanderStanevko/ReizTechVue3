<template>
  <div
    class="mobile-card"
    :class="{ 'mobile-card--selected': isSelected }"
    @click="onSelectItem"
  >
    <section
      class="mobile-card__section"
    >
      <div class="flex-row justify-between gap-20">
        <div class="full-width">
          <div class="full-width mb-20">
            <div class="mobile-card__label">
              Title
            </div>

            <div class="mobile-card__value">
              <RouterLink :to="{ name: 'ProductPageDetails', params: { productId: item.id } }">
                {{ item.title }}
              </RouterLink>
            </div>
          </div>

          <div class="full-width mb-20">
            <div class="mobile-card__label">
              Category
            </div>

            <div class="mobile-card__value">
              {{ item.category }}
            </div>
          </div>

          <div class="full-width mb-20">
            <div class="mobile-card__label">
              Brand
            </div>

            <div class="mobile-card__value">
              {{ item.brand }}
            </div>
          </div>
        </div>
        <div class="full-width">
          <div class="full-width mb-20">
            <div class="mobile-card__label">
              Price
            </div>

            <div class="mobile-card__value">
              {{ item.price }}
            </div>
          </div>

          <div class="full-width mb-20">
            <div class="mobile-card__label">
              Stock
            </div>

            <div class="mobile-card__value">
              {{ item.stock }}
            </div>
          </div>

          <div class="full-width mb-20">
            <div class="mobile-card__label">
              Rating
            </div>

            <div class="mobile-card__value">
              {{ item.rating }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type{
  ProductItem,
} from 'types'

export default defineComponent({
  name: 'ProductInformationDocumenListItem',
  props: {
    item: {
      type: Object as PropType<ProductItem>,
      default: () => ({}),
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selectItem'],
  setup(props, { emit }) {
    const onSelectItem = () => {
      emit('selectItem', props.item)
    }

    return {
      onSelectItem,
    }
  },
})
</script>
<style scoped lang="scss">
.mobile-card {
  transition: background-color 0.5s ease;

  &--selected {
    background-color: #e3e8f7;
  }
}
</style>
