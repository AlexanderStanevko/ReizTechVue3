<template>
  <header class="main-header">
    <h1>Логотип</h1>
    <AppInput
      v-model="searchValue"
      placeholder="Enter category"
      label="search"
      type="search"
    />

    <AppInput
      v-model="searchValue"
      clearable
      placeholder="Search..."
    >
      <template #prepend>
        <img
          src="src/assets/svg/search-normal.svg"
          alt="Prepend Icon"
        >
      </template>
   </AppInput>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppInput from 'components/App/AppInput.vue'

export default defineComponent({
  name: 'MainHeader',
  components: {
    AppInput,
  },
  setup() {
    const searchValue = ref('')

    return {
      searchValue,
    }
  },
})
</script>

<style lang="scss" scoped>
.main-header {
  background-color: #f8f8;
  color: #fff;
  padding: 1rem;
  text-align: center;
}
</style>
