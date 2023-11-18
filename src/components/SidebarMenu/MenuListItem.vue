<template>
  <a
    :href="item.link"
    class="menu-item"
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

export default defineComponent({
  name: 'MenuListItem',
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
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
}
</style>
