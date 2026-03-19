import { createApp } from 'vue'
import HomePage from './pages/HomePage.js'

const app = createApp({
  data() {
    return {
      currentPage: 'home',
    }
  },
  components: {
    HomePage,
  },
  template: `
    <template v-if="currentPage === 'home'">
      <HomePage @enter-app="currentPage = 'uv'" />
    </template>
  `
})

app.mount('#app')