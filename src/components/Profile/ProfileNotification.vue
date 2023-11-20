<template>
  <div class="notification">
    <img
      class="notification__icon"
      src="src/assets/svg/notification-bing.svg"
      alt="Notification"
    />
    <div
      class="notification__dot"
      :style="{ backgroundColor: badgeColor }">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileNotification',
  props: {
    badgeColor: {
      type: String,
      default: '#FFC107',
    },
  },
})
</script>

<style scoped lang="scss">
.notification {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #FFFFFF;
  min-width: 52px;
  min-height: 52px;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification__icon {
  width: 24px;
  height: 24px;
}

.notification__dot {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  transform: translate(50%, -50%);
}
</style>
