import PersonalSkinRisk from '../components/PersonalSkinRisk.js'
import UVClothingGuide from '../components/UVClothingGuide.js'
import SunscreenProtector from '../components/SunscreenProtector.js'

export default {
  name: 'ProtectionGuidePage',
  components: {
    PersonalSkinRisk,
    UVClothingGuide,
    SunscreenProtector
  },
  emits: ['go-home'],
  template: `
    <main class="page">
      <section class="guide-page-header">
        <button class="back-btn" @click="$emit('go-home')">← Back</button>
        <h2>Protection Guide</h2>
      </section>

      <section class="guide-stack">
        <PersonalSkinRisk />
        <UVClothingGuide />
        <SunscreenProtector />
      </section>
    </main>
  `
}