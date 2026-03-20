import AwarenessDashboard from '../components/AwarenessDashboard.js'
import PersonalSkinRisk from '../components/PersonalSkinRisk.js'
import UVClothingGuide from '../components/UVClothingGuide.js'
import SunscreenProtector from '../components/SunscreenProtector.js'
import UVInfo from '../components/UVInfo.js'
import WeatherDashboard from '../components/WeatherDashboard.js'

export default {
  name: 'ProtectionGuidePage',

  components: {
    AwarenessDashboard,
    PersonalSkinRisk,
    UVClothingGuide,
    SunscreenProtector,
    UVInfo,
    WeatherDashboard
  },

  emits: ['go-home'],

  data() {
    return {
      selectedSkinType: 'Type III',
      uvIndex: 0 
    }
  },

  methods: {
    updateSkinType(type) {
      this.selectedSkinType = type
    }
  },

  template: `
  <main class="page">

    <!-- Header -->
    <section class="guide-page-header">
      <button class="back-btn" @click="$emit('go-home')">← Back</button>
      <h2>Protection Guide</h2>
    </section>

    <!-- Main Content -->
    <section class="guide-stack">

      <!-- 1. Awareness -->
      <AwarenessDashboard />

      <!-- 2. Data Visualisation -->
      <WeatherDashboard />

      <!-- 3. Personal Skin Risk -->
      <PersonalSkinRisk
        :selected-skin-type="selectedSkinType"
        @skin-type-changed="updateSkinType"
      />

      <!-- 4. UV Info -->
      <UVInfo @update-uv="uvIndex = $event" />

      <!-- 5. Clothing Guide -->
      <UVClothingGuide
        :uv-index="uvIndex"
      />

      <!-- 6. Sunscreen -->
      <SunscreenProtector
        :selected-skin-type="selectedSkinType"
      />

    </section>

  </main>
`
}