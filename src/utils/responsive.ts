import { ref } from 'vue'

const mobileMaxWidth = 768
const isMobile = ref(false)
const isDesktop = ref(false)

const checkScreenType = () => {
  isMobile.value = window.innerWidth <= mobileMaxWidth
  isDesktop.value = !isMobile.value
}

checkScreenType()
window.addEventListener('resize', checkScreenType)

export default {
  isDesktop,
  isMobile,
}
