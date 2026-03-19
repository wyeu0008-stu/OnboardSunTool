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
      currentPage: 'home',
      currentUVIndex: 0
    }
  },

  methods: {
    goHome() {
      this.currentPage = 'home'
    },

    updateUVIndex(uv) {
      this.currentUVIndex = Number(uv) || 0
    }
  },

  template: `
    <div>

      <nav class="navbar">
        <div class="logo" @click="currentPage = 'home'">UV Defender</div>

        <div class="nav-links">
          <span :class="{ active: currentPage === 'home' }" @click="currentPage = 'home'">Home</span>
          <span :class="{ active: currentPage === 'uv' }" @click="currentPage = 'uv'">UV Alert</span>
          <span :class="{ active: currentPage === 'calculator' }" @click="currentPage = 'calculator'">Calculator</span>
          <span :class="{ active: currentPage === 'guide' }" @click="currentPage = 'guide'">Clothing Guide</span>
        </div>
      </nav>

      <main class="page">

        <template v-if="currentPage === 'home'">
          <section class="intro">
            <h1>UV Defender</h1>
            <p>Real-time UV protection guidance for safer outdoor living</p>
          </section>

          <section class="feature-grid">

            <div class="feature-card" @click="currentPage = 'uv'">
              <h3>☀️ UV Alert</h3>
              <p>Check real-time UV levels and risk levels</p>
            </div>

            <div class="feature-card" @click="currentPage = 'calculator'">
              <h3>🧴 Protection Calculator</h3>
              <p>Calculate sunscreen usage and reapply reminders</p>
            </div>

            <div class="feature-card" @click="currentPage = 'guide'">
              <h3>👕 Clothing Guide</h3>
              <p>Get clothing advice based on UV levels</p>
            </div>

          </section>

          <section class="hero-image" style="text-align:center;">
            <img 
              src="https://images.unsplash.com/photo-1531129630896-1744cab0cafd?q=80&w=1200&auto=format&fit=crop"
              alt="UV protection under sun umbrella"
              style="width:100%; max-width:1100px; display:block; margin:30px auto; border-radius:20px; box-shadow:0 20px 50px rgba(0,0,0,0.15)"
            />
            <p class="image-caption">
              Using shade is one of the most effective ways to reduce UV exposure.
            </p>
          </section>
        </template>

        <template v-else-if="currentPage === 'uv'">
          <UVInfo @update-uv="updateUVIndex" />
        </template>

        <template v-else-if="currentPage === 'calculator'">
          <SunProTimer :uv-index="currentUVIndex" />
        </template>

        <template v-else-if="currentPage === 'guide'">
          <ProtectionGuidePage @go-home="goHome" />
        </template>

      </main>

    </div>
  `
}).mount('#app')
