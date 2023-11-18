<template>
  <div class="main-layout">
    <MainSidebar v-if="isDesktop"/>
    <div class="right-section">
      <MainHeader />
      <main class="main-content">
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
.main-layout,
.right-section {
  display: flex;
  flex-grow: 1;
}

.main-layout {
  background-color: var(--vt-c-white-soft);
  height: 100vh;
}
.right-section {
  flex-direction: column;
  padding: 2rem;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
