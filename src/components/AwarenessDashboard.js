export default {
  name: 'AwarenessDashboard',
  data() {
    return {
      uvTrendData: [
        { city: 'Melbourne', uv: 8 },
        { city: 'Sydney', uv: 10 },
        { city: 'Brisbane', uv: 11 },
        { city: 'Perth', uv: 9 }
      ],
      skinCancerStats: [
        { label: 'Australians diagnosed each year', value: 2 },
        { label: 'Australians treated each year', value: 7 },
        { label: 'Australians by age 70', value: 66 }
      ]
    }
  },
  computed: {
    maxUV() {
      return Math.max(...this.uvTrendData.map(item => item.uv))
    },
    maxStat() {
      return Math.max(...this.skinCancerStats.map(item => item.value))
    }
  },
  template: `
    <section class="card">
      <h3>UV Awareness Dashboard</h3>

      <p>
        Australia has some of the highest UV levels in the world. UV radiation can damage skin even
        on cool or cloudy days. A common myth is that only fair skin needs protection, but all skin
        types can be harmed by UV exposure.
      </p>

      <p>
        Young adults often underestimate long-term UV damage. Building daily protection habits helps
        reduce sunburn risk and supports long-term skin health.
      </p>

      <div class="chart-block">
        <h4>Visualisation 1: Average UV Levels in Australian Cities</h4>
        <div class="bar-chart">
          <div
            v-for="item in uvTrendData"
            :key="item.city"
            class="bar-item"
          >
            <div
              class="bar"
              :style="{ height: (item.uv / maxUV) * 140 + 'px' }"
            ></div>
            <strong>{{ item.uv }}</strong>
            <span>{{ item.city }}</span>
          </div>
        </div>
        <p class="chart-explanation">
          This chart shows that UV levels remain high across major Australian cities, which means sun
          protection is important in everyday outdoor activities.
        </p>
      </div>

      <div class="chart-block">
        <h4>Visualisation 2: Skin Cancer Awareness Snapshot</h4>
        <div class="bar-chart">
          <div
            v-for="item in skinCancerStats"
            :key="item.label"
            class="bar-item"
          >
            <div
              class="bar secondary"
              :style="{ height: (item.value / maxStat) * 140 + 'px' }"
            ></div>
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <p class="chart-explanation">
          This chart highlights how common skin cancer is in Australia and why awareness, early
          prevention, and regular protection habits are essential.
        </p>
      </div>
    </section>
  `
}