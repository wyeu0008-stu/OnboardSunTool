export default {
  name: 'UVClothingGuide',

  props: {
    uvIndex: {
      type: Number,
      default: 0
    }
  },

  computed: {
    clothingAdvice() {
      if (this.uvIndex <= 2) {
        return [
          { icon: '🕶', text: 'Wear sunglasses' }
        ]
      }

      if (this.uvIndex <= 5) {
        return [
          { icon: '🕶', text: 'Wear sunglasses' },
          { icon: '🧢', text: 'Wear a hat' }
        ]
      }

      if (this.uvIndex <= 7) {
        return [
          { icon: '👕', text: 'Wear long sleeve shirt' },
          { icon: '🧢', text: 'Wear a hat' },
          { icon: '🕶', text: 'Wear sunglasses' }
        ]
      }

      if (this.uvIndex <= 10) {
        return [
          { icon: '👕', text: 'Wear UPF protective long sleeve shirt' },
          { icon: '🧢', text: 'Wear a wide-brim hat' },
          { icon: '🕶', text: 'Wear UV400 sunglasses' },
          { icon: '🌳', text: 'Seek shade when possible' }
        ]
      }

      return [
        { icon: '👕', text: 'Wear full protective clothing (UPF 50+)' },
        { icon: '🧢', text: 'Wear a wide-brim hat' },
        { icon: '🕶', text: 'Wear UV400 sunglasses' },
        { icon: '🌳', text: 'Stay in shade during peak UV hours' }
      ]
    }
  },

  template: `
    <section class="epic2-card">
      <h3 class="epic2-title">UV-Based Clothing Guide</h3>

      <p class="epic2-subtext">
        Current UV Index: <strong>{{ uvIndex }}</strong>
      </p>

      <p class="epic2-subtext">
        Based on the current UV level, the following clothing is recommended to reduce sun exposure.
      </p>

      <div class="epic2-panel">
        <h4>Recommended Clothing</h4>
        <ul>
          <li v-for="item in clothingAdvice" :key="item.text">
            <span style="font-size:20px;margin-right:8px;">{{ item.icon }}</span>
            {{ item.text }}
          </li>
        </ul>
      </div>
    </section>
  `
}