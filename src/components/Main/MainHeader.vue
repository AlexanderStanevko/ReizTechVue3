<template>
  <header class="main-header">
    <AppInput
      v-model="searchValue"
      clearable
      placeholder="Search..."
      class="main-header__search-field"
    >
      <template #prepend>
        <img
          src="src/assets/svg/search-normal.svg"
          alt="Prepend Icon"
        >
      </template>
   </AppInput>
   <div class="main-header__profile-section">
     <ProfileNotification badgeColor="red"/>
     <ProfileAvatar avatarPath="src/assets/svg/profile-avatar.svg" />
   </div>

  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppInput from 'components/App/AppInput.vue'
import ProfileNotification from 'components/Profile/ProfileNotification.vue'
import ProfileAvatar from 'components/Profile/ProfileAvatar.vue'

export default defineComponent({
  name: 'MainHeader',
  components: {
    AppInput,
    ProfileAvatar,
    ProfileNotification,
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
}
</style>
