<template>
  <div class="input-container">
    <label
      v-if="label"
      :for="uuid">
      {{ label }}
    </label>
    <div
      class="field-wrapper"
      :class="{ 'is-focused': isFocused }"
    >
      <div
        v-if="$slots.prepend"
        class="prepend-icon"
      >
        <slot name="prepend"></slot>
      </div>
      <input
        v-model="modelValueLocal"
        class="field"
        :id="uuid"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :style="{ 'padding-left': computePaddingLeft, 'padding-right': computePaddingRight }"
      />
      <div
        v-if="clearable && modelValueLocal"
        class="clear-icon"
        @click="clearInput"
      >
        <slot name="clear">
          <img
            src="src/assets/svg/clear-icon.svg"
            alt="Clear"
          />
        </slot>
      </div>
    </div>
    <span
      v-if="error"
      class="error-message"
    >
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { UniqueID } from 'hooks/UniqueID'

export default defineComponent({
  name: 'AppInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const uuid = UniqueID().getID()
    const isFocused = ref(false)
    const modelValueLocal = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    })

    const clearInput = () => {
      emit('update:modelValue', '')
    }

    const computePaddingLeft = computed(
      () => (slots.prepend ? '36px' : '12px'),
    )
    const computePaddingRight = computed(
      () => ((slots.append || (props.clearable && modelValueLocal.value)) ? '36px' : '12px'),
    )

    return {
      modelValueLocal,
      uuid,
      isFocused,
      clearInput,
      computePaddingLeft,
      computePaddingRight,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  font-family: inherit;
}

.field-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s ease-in-out;

  &.is-focused {
    border-color: #007bff;
  }
}

.field {
  flex-grow: 1;
  height: 52px;
  padding: 0 12px;
  border: none;
  border-radius: 6px;
  transition: padding-left 0.2s ease-in-out, padding-right 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
}

.prepend-icon, .clear-icon {
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  transition: opacity 0.2s ease-in-out;
}

.prepend-icon {
  left: 0;
  padding: 0 6px;
}

.clear-icon {
  right: 0;
  padding: 0 12px;
  opacity: 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.field-wrapper:hover .clear-icon {
  opacity: 1;
}

.error-message {
  color: #ff3860;
  margin-top: 4px;
  font-size: 14px;
}
label {
  text-align: left;
  color: #000;
}
</style>
