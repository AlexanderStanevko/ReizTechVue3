<template>
  <div>
    <div>
      <div>
        404
      </div>

      <div>
        Oops... Page not found
      </div>

      <button @click="handelGoHome">Go Home</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorNotFound',
  setup() {
    const router = useRouter()
    const handelGoHome = () => {
      router.push('/')
    }

    return {
      handelGoHome,
    }
  },
})
</script>
