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
    <section class="card">
      <h3>UV-Based Clothing Guide</h3>

      <p>
        Current UV Index: <strong>{{ uvIndex }}</strong>
      </p>

      <p>
        Based on the current UV level, the following clothing is recommended to reduce sun exposure:
      </p>

      <ul>
        <li v-for="item in clothingAdvice" :key="item.text">
          <span style="font-size:20px;margin-right:6px">{{ item.icon }}</span>
          {{ item.text }}
        </li>
      </ul>

    </section>
  `
}