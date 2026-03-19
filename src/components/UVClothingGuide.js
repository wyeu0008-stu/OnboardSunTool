export default {
  name: 'UVClothingGuide',
  props: {
    selectedSkinType: {
      type: String,
      default: 'Type III'
    }
  },
  computed: {
    clothingAdvice() {
      const map = {
        'Type I': [
          'Wide-brim hat',
          'UPF 50+ long-sleeve shirt',
          'UV400 sunglasses',
          'Stay in shade where possible'
        ],
        'Type II': [
          'Wide-brim hat',
          'UPF 50+ shirt',
          'UV400 sunglasses',
          'Cover shoulders during high UV periods'
        ],
        'Type III': [
          'Hat or cap with shade coverage',
          'Light long-sleeve shirt',
          'UV400 sunglasses'
        ],
        'Type IV': [
          'Hat for long outdoor activities',
          'Comfortable protective shirt',
          'UV400 sunglasses'
        ],
        'Type V': [
          'Sunglasses',
          'Hat for extended sun exposure',
          'Comfortable protective clothing'
        ]
      }
      return map[this.selectedSkinType] || map['Type III']
    }
  },
  template: `
    <section class="epic2-card">
      <h3 class="epic2-title">UV-Based Clothing Guide</h3>

      <p class="epic2-subtext">
        Based on the selected skin type, the following clothing guidance can help reduce sun exposure.
      </p>

      <div class="epic2-panel">
        <h4>Recommended Clothing</h4>
        <ul>
          <li v-for="item in clothingAdvice" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>
  `
}