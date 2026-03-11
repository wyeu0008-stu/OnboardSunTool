import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import UVInfo from './components/UVInfo.js'
import SunProTimer from './components/SunProTimer.js'
import SunCalEntry from './components/SunCalEntry.js'

createApp({
  name: 'SunToolPageOne',
  components: {
    UVInfo,
    SunProTimer,
    SunCalEntry
  },
  template: `
    <main class="page">
      <section class="panel-grid">
        <UVInfo />
        <SunProTimer />
      </section>

      <SunCalEntry />
    </main>
  `
}).mount('#app')
