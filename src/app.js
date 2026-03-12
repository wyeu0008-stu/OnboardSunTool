import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import UVInfo from './components/UVInfo.js'
import SunProTimer from './components/SunProTimer.js'
import SunCalEntry from './components/SunCalEntry.js'
import ProtectionGuidePage from './pages/ProtectionGuidePage.js'

createApp({
  name: 'SunToolPageOne',

  components: {
    UVInfo,
    SunProTimer,
    SunCalEntry,
    ProtectionGuidePage
  },

  data() {
    return {
      currentPage: 'home'
    }
  },

  methods: {
    openGuidePage() {
      this.currentPage = 'guide'
    },
    goHome() {
      this.currentPage = 'home'
    }
  },

  template: `
    <template v-if="currentPage === 'home'">
      <main class="page">
        <section class="panel-grid">
          <UVInfo />
          <SunProTimer />
        </section>

        <SunCalEntry @open-guide-page="openGuidePage" />
      </main>
    </template>

    <template v-else-if="currentPage === 'guide'">
      <ProtectionGuidePage @go-home="goHome" />
    </template>
  `
}).mount('#app')