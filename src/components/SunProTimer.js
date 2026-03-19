export default {
  name: 'SunProTimer',

  props: {
    uvIndex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      localUVIndex: 0,
      outdoorTime: 30,
      reminderMinutes: 120,
      reminderActive: false,
      reminderMessage: '',
      reminderTimerId: null
    }
  },

  watch: {
    uvIndex: {
      immediate: true,
      handler(newValue) {
        const safeUV = Number(newValue) || 0
        this.localUVIndex = safeUV
        this.reminderMinutes = this.getRecommendedReminderMinutes(safeUV)
      }
    }
  },

  computed: {
    recommendedProtection() {
      const uv = this.localUVIndex

      if (uv <= 2) {
        return {
          spf: 'SPF 15+',
          advice: 'Low UV. Basic protection is usually enough.',
          intervalText: 'Reapply every 2 hours'
        }
      }

      if (uv <= 5) {
        return {
          spf: 'SPF 30+',
          advice: 'Moderate UV. Use sunscreen and wear a hat.',
          intervalText: 'Reapply every 2 hours'
        }
      }

      if (uv <= 7) {
        return {
          spf: 'SPF 50+',
          advice: 'High UV. Strong protection is recommended.',
          intervalText: 'Reapply every 90 minutes'
        }
      }

      if (uv <= 10) {
        return {
          spf: 'SPF 50+',
          advice: 'Very High UV. Extra protection is needed.',
          intervalText: 'Reapply every 60–90 minutes'
        }
      }

      return {
        spf: 'SPF 50+',
        advice: 'Extreme UV. Minimise direct sun exposure.',
        intervalText: 'Reapply every 60 minutes'
      }
    },

    formattedReminderTime() {
      const totalSeconds = this.reminderMinutes * 60
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
      const seconds = '00'
      return `${hours}:${minutes}:${seconds}`
    }
  },

  methods: {
    getRecommendedReminderMinutes(uv) {
      if (uv <= 2) return 120
      if (uv <= 5) return 120
      if (uv <= 7) return 90
      if (uv <= 10) return 75
      return 60
    },

    async startReminders() {
      this.stopReminders()

      const intervalMs = this.reminderMinutes * 60 * 1000
      this.reminderActive = true
      this.reminderMessage = `Reminders started. Reapply every ${this.reminderMinutes} minutes.`

      if ('Notification' in window && Notification.permission === 'default') {
        try {
          await Notification.requestPermission()
        } catch (err) {
          console.error('Notification permission error:', err)
        }
      }

      this.reminderTimerId = setInterval(() => {
        const text = `Time to reapply sunscreen. Current UV index: ${this.localUVIndex}.`

        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('UV Defender Reminder', {
            body: text
          })
        } else {
          alert(text)
        }
      }, intervalMs)
    },

    stopReminders() {
      if (this.reminderTimerId) {
        clearInterval(this.reminderTimerId)
        this.reminderTimerId = null
      }

      this.reminderActive = false
      this.reminderMessage = 'Reminders stopped.'
    }
  },

  beforeUnmount() {
    this.stopReminders()
  },

  template: `
    <article class="card calculator">
      <div class="card-header">
        <h2>🧴 Sunscreen Protection Calculator</h2>
        <span>⚙️</span>
      </div>

      <div class="calc-content">
        <div class="controls">
          <label>UV Index: {{ localUVIndex }}</label>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            v-model="localUVIndex"
          />

          <label>Outdoor Time: {{ outdoorTime }} min</label>
          <input
            type="range"
            min="30"
            max="480"
            step="30"
            v-model="outdoorTime"
          />

          <label>Reminder Interval: {{ reminderMinutes }} min</label>
          <input
            type="range"
            min="30"
            max="180"
            step="15"
            v-model="reminderMinutes"
          />

          <button v-if="!reminderActive" @click="startReminders">🔔 Start Reminders</button>
          <button v-else @click="stopReminders">⏹ Stop Reminders</button>

          <p v-if="reminderMessage" class="reminder-status">{{ reminderMessage }}</p>
        </div>

        <div class="timer">
          <p>Set Interval</p>
          <strong>{{ formattedReminderTime }}</strong>
        </div>
      </div>

      <div class="recommendations">
        <div>
          <p>✅ Recommended Protection:</p>
          <strong>{{ recommendedProtection.spf }}</strong>
          <span>{{ recommendedProtection.intervalText }}</span>
        </div>
        <ul>
          <li>✔ {{ recommendedProtection.advice }}</li>
          <li>🔔 UV-linked reminder interval is auto-set</li>
        </ul>
      </div>
    </article>
  `
}
