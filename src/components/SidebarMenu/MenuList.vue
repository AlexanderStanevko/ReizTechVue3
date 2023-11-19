<template>
  <nav class="menu-list">
    <ul class="menu-list__items">
      <li
        v-for="item in menuItems"
        :key="item.title"
        class="menu-list__item"
      >
        <MenuListItem
          :item="item"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MenuListItem from 'components/SidebarMenu/MenuListItem.vue'
import type { MenuItem } from 'types'

export default defineComponent({
  name: 'MenuList',
  components: {
    MenuListItem,
  },
  setup() {
    const menuItems = ref<MenuItem[]>([
      {
        title: 'Dashboard', icon: 'element-3.svg', link: '/dashboard',
      },
      {
        title: 'Lab Test', icon: 'clipboard-tick.svg', link: '/dashboard',
      },
      {
        title: 'Appointment', icon: 'calendar-tick.svg', link: '/dashboard',
      },
      {
        title: 'Medicine Order', icon: 'bag-tick-2.svg', link: '/dashboard',
      },
      {
        title: 'Message', icon: 'sms.svg', link: '/dashboard',
      },
      {
        title: 'Payment', icon: 'empty-wallet.svg', link: '/dashboard',
      },
      {
        title: 'Settings', icon: 'setting-2.svg', link: '/dashboard',
      },
    ])

    const onSelectItem = (selectedTitle: string) => {
      menuItems.value = menuItems.value.map((item) => ({
        ...item,
        active: item.title === selectedTitle,
      }))
    }

    return {
      menuItems,
      onSelectItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  flex-direction: column;

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 10px 0;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.3s ease, background-color 0.3s ease;

    &:hover {
      color: var(--vt-c-text-dark-2);
      background-color: var(--vt-c-text-dark-2);
    }
  }
}
</style>
