import AwarenessDashboard from '../components/AwarenessDashboard.js'
import PersonalSkinRisk from '../components/PersonalSkinRisk.js'
import UVClothingGuide from '../components/UVClothingGuide.js'
import SunscreenProtector from '../components/SunscreenProtector.js'
import UVInfo from '../components/UVInfo.js'

export default {
  name: 'ProtectionGuidePage',

  components: {
    AwarenessDashboard,
    PersonalSkinRisk,
    UVClothingGuide,
    SunscreenProtector,
    UVInfo
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

      <section class="guide-page-header">
        <button class="back-btn" @click="$emit('go-home')">← Back</button>
        <h2>Protection Guide</h2>
      </section>

      <section class="guide-stack">

        <AwarenessDashboard />

        <PersonalSkinRisk
          :selected-skin-type="selectedSkinType"
          @skin-type-changed="updateSkinType"
        />

        <UVInfo @update-uv="uvIndex = $event" />

        <UVClothingGuide
          :uv-index="uvIndex"
        />

        <SunscreenProtector
          :selected-skin-type="selectedSkinType"
        />

      </section>

    </main>
  `
}