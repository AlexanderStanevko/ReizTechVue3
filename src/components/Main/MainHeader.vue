<template>
  <header class="main-header">
    <div
      v-if="isMobile"
      class="main-header__mobile-menu"
      @click="toggleSidebar"
    >
    <img
      src="@/assets/svg/menu-hamburger.svg"
      alt="Prepend Icon"
    >
    </div>
    <AppInput
      v-model="searchValue"
      clearable
      placeholder="Search..."
      class="main-header__search-field"
    >
      <template #prepend>
        <img
          src="@/assets/svg/search-normal.svg"
          alt="Prepend Icon"
        >
      </template>
   </AppInput>
   <div class="main-header__profile-section">
     <ProfileNotification badgeColor="red"/>
     <ProfileAvatar avatarName="profile-avatar.svg" />
   </div>

  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppInput from 'components/App/AppInput.vue'
import ProfileNotification from 'components/Profile/ProfileNotification.vue'
import ProfileAvatar from 'components/Profile/ProfileAvatar.vue'
import { responsive } from 'utils'

export default defineComponent({
  name: 'MainHeader',
  components: {
    AppInput,
    ProfileAvatar,
    ProfileNotification,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggleSidebar'],
  setup(props, { emit }) {
    const searchValue = ref('')
    const toggleSidebar = () => {
      emit('toggleSidebar')
    }

    return {
      ...responsive,
      searchValue,
      toggleSidebar,
    }
  },
})
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-align: center;
  width: 100%;

  &__search-field {
    max-width: 655px;
  }

  &__profile-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-left: 20px;
  }
  &__mobile-menu {
    margin-right: 20px;
  }
}
</style>
