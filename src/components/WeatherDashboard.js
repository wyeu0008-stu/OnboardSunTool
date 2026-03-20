export default {
  name: 'WeatherDashboard',

  data() {
    return {
      timestamp: 'Thu, 19 Mar 2026 · 12:00 UTC',
      cardColors: [
        '#ff6b6b',
        '#ffd93d',
        '#6bcb77',
        '#4d96ff',
        '#c77dff',
        '#00b4d8',
        '#f4845f',
        '#90e0ef'
      ],
      weatherData: [
        { city: 'Canberra', humidity: 82, temperature: 18.86, weather: 'overcast clouds' },
        { city: 'Adelaide', humidity: 69, temperature: 21.70, weather: 'broken clouds' },
        { city: 'Hobart', humidity: 58, temperature: 20.67, weather: 'overcast clouds' },
        { city: 'Darwin', humidity: 92, temperature: 27.29, weather: 'light shower rain' },
        { city: 'Sydney', humidity: 86, temperature: 23.38, weather: 'overcast clouds' },
        { city: 'Melbourne', humidity: 86, temperature: 17.94, weather: 'overcast clouds' },
        { city: 'Brisbane', humidity: 82, temperature: 24.02, weather: 'broken clouds' },
        { city: 'Perth', humidity: 27, temperature: 30.62, weather: 'clear sky' }
      ]
    }
  },

  methods: {
    tempColor(t) {
      if (t >= 28) return '#ff6b6b'
      if (t >= 22) return '#ffd93d'
      return '#90caf9'
    },

    tempBarHeight(t) {
      const tempMin = 15
      const tempMax = 35
      return Math.round(((t - tempMin) / (tempMax - tempMin)) * 95 + 5)
    },

    weatherEmoji(w) {
      const text = w.toLowerCase()
      if (text.includes('rain')) return '🌧'
      if (text.includes('clear')) return '☀️'
      if (text.includes('broken')) return '⛅'
      return '☁️'
    }
  },

  template: `
    <section class="epic2-card weather-dashboard">
      <h3 class="epic2-title">
        <span style="margin-right: 8px;">🇦🇺</span>
        Australian Cities Weather
      </h3>

      <p class="epic2-subtext">{{ timestamp }}</p>

      <div class="weather-cards-grid">
        <div
          v-for="(city, i) in weatherData"
          :key="city.city"
          class="weather-city-card"
          :style="{ borderColor: cardColors[i] }"
        >
          <span class="weather-city-name">{{ city.city.toUpperCase() }}</span>
          <span
            class="weather-temp"
            :style="{ color: tempColor(city.temperature) }"
          >
            {{ city.temperature.toFixed(1) }}°
          </span>
          <span class="weather-condition">
            {{ weatherEmoji(city.weather) }} {{ city.weather }}
          </span>
          <span class="weather-humidity">💧 {{ city.humidity }}%</span>
        </div>
      </div>

      <div class="epic2-two-col">
        <div class="epic2-chart-block">
          <h4>Temperature (°C)</h4>

          <div class="epic2-bar-chart">
            <div
              v-for="city in weatherData"
              :key="'t-' + city.city"
              class="epic2-bar-item"
            >
              <div class="epic2-bar-value">{{ city.temperature.toFixed(1) }}</div>
              <div
                class="epic2-bar"
                :style="{
                  height: tempBarHeight(city.temperature) + '%',
                  background: tempColor(city.temperature)
                }"
              ></div>
              <div class="epic2-bar-label">{{ city.city }}</div>
            </div>
          </div>
        </div>

        <div class="epic2-chart-block">
          <h4>Humidity (%)</h4>

          <div class="epic2-bar-chart">
            <div
              v-for="(city, i) in weatherData"
              :key="'h-' + city.city"
              class="epic2-bar-item"
            >
              <div class="epic2-bar-value">{{ city.humidity }}</div>
              <div
                class="epic2-bar secondary"
                :style="{
                  height: city.humidity + '%',
                  background: cardColors[i]
                }"
              ></div>
              <div class="epic2-bar-label">{{ city.city }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}