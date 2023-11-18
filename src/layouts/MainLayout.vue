<template>
  <div class="main-layout">
    <MainSidebar />
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

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainHeader,
    MainSidebar,
  },
  setup() {
  },
})
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  height: 100vh;
}

.right-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>
