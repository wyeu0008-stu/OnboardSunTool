export default {
  name: 'PersonalSkinRisk',
  props: {
    selectedSkinType: {
      type: String,
      default: 'Type III'
    }
  },
  emits: ['skin-type-changed'],
  computed: {
    skinProfiles() {
      return [
        {
          type: 'Type I',
          tone: 'Very fair skin',
          risk: 'Very High',
          burnChance: '90%',
          advice: [
            'Apply SPF 50+ sunscreen',
            'Seek shade during peak UV hours',
            'Wear a hat and UV-protective sunglasses'
          ]
        },
        {
          type: 'Type II',
          tone: 'Fair skin',
          risk: 'High',
          burnChance: '80%',
          advice: [
            'Apply SPF 50+ sunscreen',
            'Reapply every 2 hours',
            'Wear protective clothing outdoors'
          ]
        },
        {
          type: 'Type III',
          tone: 'Medium skin',
          risk: 'Moderate',
          burnChance: '65%',
          advice: [
            'Use broad-spectrum SPF 30+ or SPF 50+',
            'Wear a hat when UV is high',
            'Limit long outdoor exposure at midday'
          ]
        },
        {
          type: 'Type IV',
          tone: 'Olive / light brown skin',
          risk: 'Moderate',
          burnChance: '45%',
          advice: [
            'Use sunscreen daily',
            'Wear sunglasses and protective clothing',
            'Do not assume darker skin is fully protected'
          ]
        },
        {
          type: 'Type V',
          tone: 'Brown / dark skin',
          risk: 'Lower but still present',
          burnChance: '30%',
          advice: [
            'Use sunscreen for long outdoor exposure',
            'Wear sunglasses and seek shade when UV is very high',
            'Remember UV damage can still affect all skin types'
          ]
        }
      ]
    },
    currentProfile() {
      return this.skinProfiles.find(
        profile => profile.type === this.selectedSkinType
      ) || this.skinProfiles[2]
    }
  },
  methods: {
    changeSkinType(event) {
      this.$emit('skin-type-changed', event.target.value)
    }
  },
  template: `
    <section class="epic2-card">
      <h3 class="epic2-title">Personal Skin Risk</h3>

      <div class="epic2-form-row">
        <label for="skinTypeSelect">Select your skin type:</label>
        <select
          id="skinTypeSelect"
          :value="selectedSkinType"
          @change="changeSkinType"
        >
          <option
            v-for="profile in skinProfiles"
            :key="profile.type"
            :value="profile.type"
          >
            {{ profile.type }} - {{ profile.tone }}
          </option>
        </select>
      </div>

      <div class="epic2-info-grid">
        <div class="epic2-info-box">
          <span class="label">Selected Profile</span>
          <span class="value">{{ currentProfile.type }}</span>
          <p>{{ currentProfile.tone }}</p>
        </div>

        <div class="epic2-info-box">
          <span class="label">Sunburn Risk</span>
          <span class="value">{{ currentProfile.risk }}</span>
        </div>

        <div class="epic2-info-box">
          <span class="label">Estimated Burn Chance</span>
          <span class="value">{{ currentProfile.burnChance }}</span>
        </div>
      </div>

      <div class="epic2-panel">
        <h4>Personalised UV Advice</h4>
        <ul>
          <li v-for="item in currentProfile.advice" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>
  `
}