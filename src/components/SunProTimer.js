export default {
  name: 'SunProTimer',
  template: `
    <article class="card calculator">
      <div class="card-header">
        <h2>🧴 Sunscreen Protection Calculator</h2>
        <span>⚙️</span>
      </div>

      <div class="calc-content">
        <div class="controls">
          <label>UV Index: 11</label>
          <input type="range" min="1" max="12" value="9" />

          <label>Outdoor Time: 30 min</label>
          <input type="range" min="30" max="480" value="30" />

          <button>🔔 Start Reminders</button>
        </div>

        <div class="timer">
          <p>Set Interval</p>
          <strong>01:30:00</strong>
        </div>
      </div>

      <div class="recommendations">
        <div>
          <p>✅ Recommended Protection:</p>
          <strong>SPF 50+</strong>
          <span>Reapply every 2 hours</span>
        </div>
        <ul>
          <li>✔ Customizable reapply interval</li>
          <li>🔔 Receive timely sun protection alerts</li>
        </ul>
      </div>
    </article>
  `
}
