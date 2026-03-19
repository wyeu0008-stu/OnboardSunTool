export default {
  name: 'SunscreenProtector',
  props: {
    selectedSkinType: {
      type: String,
      default: 'Type III'
    }
  },
  computed: {
    sunscreenPlan() {
      const map = {
        'Type I': {
          spf: 'SPF 50+',
          reapply: 'Reapply every 2 hours',
          actions: [
            'Apply sunscreen SPF 50+',
            'Wear a hat',
            'Seek shade',
            'Avoid long exposure during peak UV'
          ]
        },
        'Type II': {
          spf: 'SPF 50+',
          reapply: 'Reapply every 2 hours',
          actions: [
            'Apply sunscreen SPF 50+',
            'Wear a hat',
            'Use sunglasses',
            'Seek shade when UV is high'
          ]
        },
        'Type III': {
          spf: 'SPF 30+ to SPF 50+',
          reapply: 'Reapply every 2 hours',
          actions: [
            'Apply sunscreen before going outside',
            'Wear protective clothing',
            'Seek shade for long outdoor stays'
          ]
        },
        'Type IV': {
          spf: 'SPF 30+',
          reapply: 'Reapply after extended sun exposure',
          actions: [
            'Use sunscreen daily',
            'Wear sunglasses',
            'Protect skin during peak UV hours'
          ]
        },
        'Type V': {
          spf: 'SPF 30+',
          reapply: 'Reapply when outdoors for long periods',
          actions: [
            'Use sunscreen when outdoors for extended time',
            'Wear sunglasses',
            'Seek shade in extreme UV conditions'
          ]
        }
      }
      return map[this.selectedSkinType] || map['Type III']
    }
  },
  template: `
    <section class="epic2-card">
      <h3 class="epic2-title">Sunscreen Protector</h3>

      <div class="epic2-mini-grid">
        <div class="epic2-info-box">
          <span class="label">Recommended SPF</span>
          <span class="value">{{ sunscreenPlan.spf }}</span>
        </div>

        <div class="epic2-info-box">
          <span class="label">Reapplication</span>
          <span class="value">{{ sunscreenPlan.reapply }}</span>
        </div>
      </div>

      <div class="epic2-two-col">
        <div class="epic2-panel">
          <h4>Recommended Protection Actions</h4>
          <ul>
            <li v-for="item in sunscreenPlan.actions" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="epic2-panel">
          <h4>Suggested Sunscreen Amount</h4>
          <p><strong>Face:</strong> 1 teaspoon</p>
          <p><strong>Arms:</strong> 2 teaspoons</p>
          <p><strong>Legs:</strong> 2 teaspoons</p>
        </div>
      </div>
    </section>
  `
}