<!-- <template>
  <div class="main-layout">
    <MainSidebar v-if="isDesktop"/>
    <div class="right-section">
      <MainHeader class=""/>
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
</style> -->

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
    // Стили для боковой панели
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2rem;
  }

  &__header {
    margin-bottom: 30px;
  }

  &__view {
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
