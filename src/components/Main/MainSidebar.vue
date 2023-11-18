<template>
  <aside class="sidebar">
    <div class="sidebar__title">Sales.</div>
    <nav class="sidebar__menu">
      <MenuList />
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuList from 'components/SidebarMenu/MenuList.vue'

export default defineComponent({
  name: 'MainSidebar',
  components: {
    MenuList,
  },
  setup() {
  },
})
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--vt-c-white);
  width: 230px;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  &__title {
    color: var(--vt-c-primary);
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: bold;
  }

  &__menu {
    flex-grow: 1;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
      }

      a {
        text-decoration: none;
        color: var(--vt-c-text);
        transition: color 0.3s ease;

        &:hover {
          color: var(--vt-c-text-hover);
        }
      }
    }
  }
}
</style>
