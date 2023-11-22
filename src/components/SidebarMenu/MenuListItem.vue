<template>
  <a
    class="menu-item"
  >
    <img
      :src="imagePath"
      :alt="item.title"
      class="menu-item__icon"
    />
    <span class="menu-item__title">
      {{ item.title }}
    </span>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
  setup(props) {
    const imagePath = computed(() => {
      debugger
      const imgUrl = new URL(`/src/assets/svg/menu-items/${props.item.icon}`, import.meta.url).href
      console.log('ASSETS ', imgUrl)
      return imgUrl
    })
    return {
      imagePath,
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
}
</style>
