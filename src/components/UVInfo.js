export default {
  name: 'UVInfo',
  template: `
    <article class="card uv-alert">
      <div class="card-header">
        <h2>☀️ UV Alert</h2>
        <a href="#">Change Location</a>
      </div>

      <div class="alert-level">
        <div class="uv-number">7</div>
        <div>
          <p class="city">Melbourne, Australia</p>
          <h3>High</h3>
        </div>
      </div>

      <p class="alert-message">
        <strong>High sun protection required.</strong> Apply sunscreen and seek shade.
      </p>

      <div class="risk-scale">
        <span class="low">0–2 Low</span>
        <span class="moderate">3–5 Moderate</span>
        <span class="high">6–7 High</span>
        <span class="very-high">8–10 Very High</span>
        <span class="extreme">11+ Extreme</span>
      </div>

      <p class="updated">Last updated: 17:25:52</p>

      <div class="stats-row">
        <div>
          <p>Peak UV Index</p>
          <strong>11am–1pm</strong>
        </div>
        <div>
          <p>Peak Time</p>
          <strong>1pm</strong>
        </div>
        <div>
          <p>High UV Period</p>
          <strong>5hrs</strong>
        </div>
      </div>
    </article>
  `
}
