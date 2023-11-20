<template>
  <div class="layout">
    <MainSidebar
      v-if="isDesktop"
      class="layout__sidebar"
    />
    <div class="layout__content">
      <MainHeader class="layout__header"/>
      <main class="layout__view">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainHeader from 'components/main/MainHeader.vue'
import MainSidebar from 'components/main/MainSidebar.vue'
import responsive from 'utils/responsive'

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainHeader,
    MainSidebar,
  },
  setup() {
    return {
      ...responsive,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  background-color: var(--vt-c-white-soft);
  flex-grow: 1;

  &__sidebar {
    transition: transform 0.9s ease-in-out;
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    &__sidebar {
      transform: translateX(-100%);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  &__header {
    margin-bottom: 30px;
  }

  &__view {
    flex-grow: 1;
  }
}
</style>
