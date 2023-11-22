<template>
  <button
    :class="['app-button', { 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppButton',
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const onClick = () => {
      if (!props.disabled) {
        emit('click')
      }
    }

    return {
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  background-color: #4e45c4;
  color: var(--vt-c-white);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  &:active:not(.is-disabled) {
    background-color: lighten(#007bff, 10%);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  &.is-disabled {
    cursor: not-allowed;
    background-color: #e9ecef;
    color: #6c757d;
  }
}

</style>
