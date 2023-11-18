<template>
  <div class="profile-avatar">
    <img
      :src="avatarPath"
      alt="Profile Avatar"
      class="profile-avatar__image"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileAvatar',
  props: {
    avatarPath: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.profile-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  min-height: 52px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__image {
    width: 100%;
    height: auto;
  }
}
</style>
