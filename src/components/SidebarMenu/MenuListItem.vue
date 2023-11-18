<template>
  <a
    class="menu-item"
    :class="{ 'menu-item--active': item.active }"
    @click="handleMenuItemClick"
  >
    <img
      :src="`src/assets/svg/menu-items/${item.icon}`"
      :alt="item.title"
      class="menu-item__icon"
    />
    <span class="menu-item__title">
      {{ item.title }}
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { MenuItem } from 'types'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MenuListItem',
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
  },
  emits: ['selectMenuItem'],
  setup(props, { emit }) {
    const router = useRouter()
    const handleMenuItemClick = () => {
      emit('selectMenuItem', props.item.title)
      // router.push(props.item.link)
    }

    return {
      handleMenuItemClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  &__icon {
    margin-right: 10px;
  }

  &__title {
    color: var(--vt-c-divider-dark-1);
  }

  &--active {
    color: var(--vt-c-primary);
    background-color: var(--vt-c-divider-dark-2);
  }
}
</style>
