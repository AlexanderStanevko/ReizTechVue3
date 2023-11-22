<template>
  <div class="layout">
    <div
      v-if="isMobile && isSidebarVisible"
      :class="{'layout__overlay--visible': isSidebarVisible}"
      class="layout__overlay"
      @click="onToggleSidebar"
    ></div>
    <MainSidebar
      :isSidebarVisible="isSidebarVisible"
      class="layout__sidebar"
      :class="{'layout__sidebar--visible': isSidebarVisible && isMobile}"
    />
    <div class="layout__content">
      <MainHeader
        class="layout__header"
        @toggleSidebar="onToggleSidebar"
      />
      <main class="layout__view">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MainHeader from 'components/main/MainHeader.vue'
import MainSidebar from 'components/main/MainSidebar.vue'
import { responsive } from 'utils'

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainHeader,
    MainSidebar,
  },
  setup() {
    const isSidebarVisible = ref(false)

    const onToggleSidebar = () => {
      isSidebarVisible.value = !isSidebarVisible.value
    }

    return {
      ...responsive,
      isSidebarVisible,
      onToggleSidebar,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  background-color: var(--vt-c-white-soft);
  flex-grow: 1;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;

    &--visible {
      opacity: 1;
    }
  }

  &__sidebar {
    overflow-y: auto;

    @media (max-width: 1023px) {
      position: fixed;
      top: 0;
      bottom: 0;
      left: -100%;
      z-index: 100;
      transition: left 0.7s ease;

      &--visible {
        left: 0;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    flex-grow: 1;
    overflow-y: auto;
  }

  &__header {
    margin-bottom: 30px;
  }

  &__view {
    flex-grow: 1;
  }
}

.layout__content::-webkit-scrollbar,
.layout__sidebar::-webkit-scrollbar
{
    display: none;
}

.layout__content,
.layout__sidebar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

@media (min-width: 1024px) {
  .layout {
    height: 100vh;
  }
}
</style>
