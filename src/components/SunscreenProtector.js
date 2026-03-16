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
    <section class="card">
      <h3>Sunscreen Protector</h3>

      <p><strong>Recommended SPF:</strong> {{ sunscreenPlan.spf }}</p>
      <p><strong>Reapplication:</strong> {{ sunscreenPlan.reapply }}</p>

      <h4>Recommended Protection Actions</h4>
      <ul>
        <li v-for="item in sunscreenPlan.actions" :key="item">{{ item }}</li>
      </ul>

      <div class="dosage-box">
        <p><strong>Suggested Sunscreen Amount:</strong></p>
        <p>Face: 1 teaspoon</p>
        <p>Arms: 2 teaspoons</p>
        <p>Legs: 2 teaspoons</p>
      </div>
    </section>
  `
}