export default {
  name: 'UVInfo',

  data() {
    return {
      uvData: null,
      loading: true,
      error: null,

      cityInput: 'Melbourne',
      showSuggestions: false,
      highlightedIndex: -1,

      australianCities: [
        'Melbourne',
        'Sydney',
        'Brisbane',
        'Perth',
        'Adelaide',
        'Canberra',
        'Hobart',
        'Darwin',
        'Gold Coast',
        'Newcastle',
        'Wollongong',
        'Geelong',
        'Townsville',
        'Cairns',
        'Ballarat',
        'Bendigo',
        'Toowoomba',
        'Launceston',
        'Alice Springs',
        'Mildura',
        'Shepparton',
        'Bunbury',
        'Rockhampton',
        'Mackay',
        'Tamworth',
        'Orange',
        'Wagga Wagga'
      ]
    }
  },

  computed: {
    filteredCities() {
      const keyword = this.cityInput.trim().toLowerCase();

      if (!keyword) {
        return this.australianCities.slice(0, 8);
      }

      return this.australianCities
        .filter(city => city.toLowerCase().includes(keyword))
        .slice(0, 8);
    }
  },

  async mounted() {
    await this.fetchUVInfo();
  },

  methods: {
    async fetchUVInfo(selectedCity = null) {
    const finalCity = (selectedCity || this.cityInput).trim();

    if (!finalCity) {
      this.error = 'Please choose an Australian city.';
      return;
    }

    if (!this.australianCities.includes(finalCity)) {
      this.error = 'Please select a valid Australian city from the list.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.showSuggestions = false;
    this.highlightedIndex = -1;

    try {
      const city = encodeURIComponent(finalCity);
      const API_BASE = '';

      const response = await fetch(
        `${API_BASE}/api/components/uv-info?city=${city}`
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.message || 'Failed to load UV info.');
      }

      this.uvData = data;
      this.cityInput = finalCity;
    } catch (err) {
      this.error = err.message || 'Failed to load UV info.';
    } finally {
      this.loading = false;
    }
  },

    onInputFocus() {
      this.showSuggestions = true;
    },

    onInputChange() {
      this.showSuggestions = true;
      this.highlightedIndex = -1;
      this.error = null;
    },

    selectCity(city) {
      this.cityInput = city;
      this.fetchUVInfo(city);
    },

    handleKeydown(event) {
      if (!this.showSuggestions) {
        this.showSuggestions = true;
      }

      const maxIndex = this.filteredCities.length - 1;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (maxIndex < 0) return;
        this.highlightedIndex =
          this.highlightedIndex < maxIndex ? this.highlightedIndex + 1 : 0;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (maxIndex < 0) return;
        this.highlightedIndex =
          this.highlightedIndex > 0 ? this.highlightedIndex - 1 : maxIndex;
      }

      if (event.key === 'Enter') {
        event.preventDefault();

        if (
          this.highlightedIndex >= 0 &&
          this.filteredCities[this.highlightedIndex]
        ) {
          this.selectCity(this.filteredCities[this.highlightedIndex]);
          return;
        }

        if (this.filteredCities.length === 1) {
          this.selectCity(this.filteredCities[0]);
          return;
        }

        this.fetchUVInfo();
      }

      if (event.key === 'Escape') {
        this.showSuggestions = false;
      }
    },

    hideSuggestionsLater() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 150);
    },

    getRiskClass(level) {
      const map = {
        'Low': 'risk-low',
        'Moderate': 'risk-moderate',
        'High': 'risk-high',
        'Very High': 'risk-very-high',
        'Extreme': 'risk-extreme',
        'Unknown': 'risk-unknown'
      };
      return map[level] || 'risk-unknown';
    },

    isActiveRisk(levelName) {
      return this.uvData && this.uvData.riskLevel === levelName;
    }
  },

  template: `
    <article
      class="card uv-alert"
      :class="uvData ? getRiskClass(uvData.riskLevel) : ''"
    >
      <div class="card-header">
        <h2>☀️ UV Alert</h2>

        <div class="location-picker">
          <div class="location-input-wrap">
            <input
              v-model="cityInput"
              type="text"
              placeholder="Choose an Australian city"
              @focus="onInputFocus"
              @input="onInputChange"
              @keydown="handleKeydown"
              @blur="hideSuggestionsLater"
            />

            <div
              v-if="showSuggestions && filteredCities.length"
              class="location-suggestions"
            >
              <div
                v-for="(city, index) in filteredCities"
                :key="city"
                class="suggestion-item"
                :class="{ active: highlightedIndex === index }"
                @mousedown.prevent="selectCity(city)"
              >
                {{ city }}
              </div>
            </div>
          </div>

          <button @click="fetchUVInfo()">Search</button>
        </div>
      </div>

      <p v-if="error" class="uv-error-text">{{ error }}</p>
      <p v-if="loading" class="uv-loading-text">Loading UV information...</p>

      <template v-if="uvData && !loading">
        <div class="alert-level">
          <div class="uv-number" :class="getRiskClass(uvData.riskLevel)">
            {{ uvData.uvNumber }}
          </div>
          <div>
            <p class="city">{{ uvData.city }}</p>
            <h3 class="risk-title" :class="getRiskClass(uvData.riskLevel)">
              {{ uvData.riskLevel }}
            </h3>
          </div>
        </div>

        <p class="alert-message">
          <strong>{{ uvData.riskLevel }} sun protection required.</strong>
          {{ uvData.message }}
        </p>

        <div class="risk-scale">
          <span class="low" :class="{ active: isActiveRisk('Low') }">0–2 Low</span>
          <span class="moderate" :class="{ active: isActiveRisk('Moderate') }">3–5 Moderate</span>
          <span class="high" :class="{ active: isActiveRisk('High') }">6–7 High</span>
          <span class="very-high" :class="{ active: isActiveRisk('Very High') }">8–10 Very High</span>
          <span class="extreme" :class="{ active: isActiveRisk('Extreme') }">11+ Extreme</span>
        </div>

        <p class="updated">Last updated: {{ uvData.updated }}</p>

        <div class="stats-row">
          <div>
            <p>Peak UV Index</p>
            <strong>{{ uvData.peakUVIndex }}</strong>
          </div>
          <div>
            <p>Peak Time</p>
            <strong>{{ uvData.peakTime }}</strong>
          </div>
          <div>
            <p>High UV Period</p>
            <strong>{{ uvData.highUVPeriod === 'N/A' ? 'No high UV today' : uvData.highUVPeriod }}</strong>
          </div>
          <div>
            <p>High UV Duration</p>
            <strong>{{ uvData.highUVDuration === '0hrs' ? '0 hrs' : uvData.highUVDuration }}</strong>
          </div>
        </div>
      </template>
    </article>
  `
}