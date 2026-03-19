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
        { label: 'Diagnosed yearly', value: 2 },
        { label: 'Treated yearly', value: 7 },
        { label: 'By age 70', value: 66 }
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
    <section class="epic2-card">
      <h3 class="epic2-title">UV Awareness Dashboard</h3>

      <p class="epic2-subtext">
        Australia has some of the highest UV levels in the world. UV radiation can damage skin even
        on cool or cloudy days. A common myth is that only fair skin needs protection, but all skin
        types can be harmed by UV exposure.
      </p>

      <p class="epic2-subtext">
        Young adults often underestimate long-term UV damage. Building daily protection habits helps
        reduce sunburn risk and supports long-term skin health.
      </p>

      <div class="epic2-chart-block">
        <h4>Visualisation 1: Average UV Levels in Australian Cities</h4>

        <div class="epic2-bar-chart">
          <div
            v-for="item in uvTrendData"
            :key="item.city"
            class="epic2-bar-item"
          >
            <div class="epic2-bar-value">{{ item.uv }}</div>
            <div
              class="epic2-bar"
              :style="{ height: (item.uv / maxUV) * 160 + 'px' }"
            ></div>
            <div class="epic2-bar-label">{{ item.city }}</div>
          </div>
        </div>

        <p class="epic2-chart-text">
          This chart shows that UV levels remain high across major Australian cities, which means
          sun protection is important in everyday outdoor activities.
        </p>
      </div>

      <div class="epic2-chart-block">
        <h4>Visualisation 2: Skin Cancer Awareness Snapshot</h4>

        <div class="epic2-bar-chart">
          <div
            v-for="item in skinCancerStats"
            :key="item.label"
            class="epic2-bar-item"
          >
            <div class="epic2-bar-value">{{ item.value }}</div>
            <div
              class="epic2-bar secondary"
              :style="{ height: (item.value / maxStat) * 160 + 'px' }"
            ></div>
            <div class="epic2-bar-label">{{ item.label }}</div>
          </div>
        </div>

        <p class="epic2-chart-text">
          This chart highlights how common skin cancer is in Australia and why awareness, early
          prevention, and regular protection habits are essential.
        </p>
      </div>
    </section>
  `
}