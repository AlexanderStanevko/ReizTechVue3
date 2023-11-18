<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/products">Продукты</router-link></li>
        <!-- Добавьте дополнительные пункты меню здесь -->
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainSidebar',
  setup() {
    // Логика для боковой панели, если она вам нужна
  },
})
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--vt-c-white);
  width: 200px;
  padding: 1rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }

    a {
      text-decoration: none;
      color: #333;

      &:hover {
        color: #000;
      }
    }
  }
}
</style>
