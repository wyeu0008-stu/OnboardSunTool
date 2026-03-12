export default {
  name: 'SunCalEntry',
  emits: ['open-guide-page'],
  template: `
    <section class="intro card">
      <h1>🧴 Sunscreen Dosage Calculator</h1>
      <p>
        Helps users determine the appropriate amount of sunscreen required for effective sun
        protection based on the current UV index and outdoor exposure time. Users can adjust the
        UV index and exposure time using sliders, and the system calculates a recommended SPF
        range and risk level assessment to guide proper sunscreen application.
      </p>

      <button class="guide-entry-btn" @click="$emit('open-guide-page')">
        View Protection Guide
      </button>
    </section>
  `
}