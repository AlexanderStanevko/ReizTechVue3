<template>
  <div class="product-information-header">
    <h2 class="product-information-header__title">Products Information</h2>
    <div class="product-information-header__fields">
      <AppInput
        v-model="titleValueLocal"
        clearable
        :disable="isLoading"
        label="Title"
        placeholder="Enter Title"
        class="product-information-header__input"
      >
        <template #prepend>
          <img
            src="src/assets/svg/search-normal.svg"
            alt="Prepend Icon"
          >
        </template>
      </AppInput>
      <AppInput
        v-model="brandValueLocal"
        clearable
        :disable="isLoading"
        label="Brand"
        placeholder="Enter Brand"
        class="product-information-header__input"
      >
      <template #prepend>
          <img
            src="src/assets/svg/search-normal.svg"
            alt="Prepend Icon"
          >
        </template>
      </AppInput>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import AppInput from 'components/App/AppInput.vue'

export default defineComponent({
  name: 'ProductInformationHeader',
  components: {
    AppInput,
  },
  props: {
    titleValue: {
      type: String,
      default: '',
    },
    brandValue: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:titleValue', 'update:brandValue'],
  setup(props, { emit }) {
    const titleValueLocal = computed({
      get: () => props.titleValue,
      set: (val) => emit('update:titleValue', val),
    })
    const brandValueLocal = computed({
      get: () => props.brandValue,
      set: (val) => emit('update:brandValue', val),
    })

    return {
      titleValueLocal,
      brandValueLocal,
    }
  },
})
</script>

<style lang="scss" scoped>
.product-information-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    margin-bottom: 1rem;
    font-size: 24px;
    font-weight: 500
  }

  &__fields {
    display: flex;
    gap: 1rem;
    width: 100%;
    &__input {
      flex: 1;
    }
  }
}

@media (min-width: 1024px) {
  .product-information-header__fields {
    width: 50%;
  }
}
</style>
