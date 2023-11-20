<template>
  <div
    class="app-spinner"
    :style="spinnerStyle">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AppSpinner',
  props: {
    size: {
      type: String,
      default: '40px',
    },
    color: {
      type: String,
      default: '#007bff',
    },
    topColor: {
      type: String,
      default: '#007bff',
    },
  },
  setup(props) {
    const spinnerStyle = computed(() => ({
      width: props.size,
      height: props.size,
      borderColor: props.color,
      borderTopColor: props.topColor,
    }))
    return {
      spinnerStyle,
    }
  },
})
</script>

<style scoped>
.app-spinner {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
