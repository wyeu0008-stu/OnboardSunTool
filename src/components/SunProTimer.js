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
      sunscreenCountdownSeconds: 0,
      outdoorCountdownSeconds: 0,
      countdownTimerId: null,
      reminderMessage: ''
    }
  },

  watch: {
    uvIndex: {
      immediate: true,
      handler(newValue) {
        const safeUV = Number(newValue) || 0
        this.localUVIndex = safeUV
        this.reminderMinutes = this.getRecommendedReminderMinutes(safeUV)

        if (!this.reminderActive) {
          this.resetCountdowns()
        }
      }
    },

    reminderMinutes() {
      if (!this.reminderActive) {
        this.resetCountdowns()
      }
    },

    outdoorTime() {
      if (!this.reminderActive) {
        this.resetCountdowns()
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
          intervalText: 'Reapply every 2 hours',
          shadeText: 'Outdoor exposure is generally low risk.'
        }
      }

      if (uv <= 5) {
        return {
          spf: 'SPF 30+',
          advice: 'Moderate UV. Use sunscreen, sunglasses and a hat.',
          intervalText: 'Reapply every 2 hours',
          shadeText: 'Seek shade around midday where possible.'
        }
      }

      if (uv <= 7) {
        return {
          spf: 'SPF 50+',
          advice: 'High UV. Strong protection is recommended.',
          intervalText: 'Reapply every 90 minutes',
          shadeText: 'Seek shade and reduce prolonged exposure.'
        }
      }

      if (uv <= 10) {
        return {
          spf: 'SPF 50+',
          advice: 'Very High UV. Extra protection is needed.',
          intervalText: 'Reapply every 75 minutes',
          shadeText: 'Limit direct sun and use shade frequently.'
        }
      }

      return {
        spf: 'SPF 50+',
        advice: 'Extreme UV. Avoid direct sun exposure where possible.',
        intervalText: 'Reapply every 60 minutes',
        shadeText: 'Return indoors or stay in deep shade where possible.'
      }
    },

    formattedSunscreenCountdown() {
      return this.formatTime(this.sunscreenCountdownSeconds)
    },

    formattedOutdoorCountdown() {
      return this.formatTime(this.outdoorCountdownSeconds)
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

    formatTime(totalSeconds) {
      const total = Math.max(0, Number(totalSeconds) || 0)
      const hours = String(Math.floor(total / 3600)).padStart(2, '0')
      const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
      const seconds = String(total % 60).padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    },

    resetCountdowns() {
      this.sunscreenCountdownSeconds = this.reminderMinutes * 60
      this.outdoorCountdownSeconds = this.outdoorTime * 60
    },

    async startReminders() {
      this.stopReminders(false)
      this.resetCountdowns()

      this.reminderActive = true
      this.reminderMessage = `Protection timer started. Recommended reapply interval: ${this.reminderMinutes} minutes.`

      if ('Notification' in window && Notification.permission === 'default') {
        try {
          await Notification.requestPermission()
        } catch (err) {
          console.error('Notification permission error:', err)
        }
      }

      this.countdownTimerId = setInterval(() => {
        if (this.outdoorCountdownSeconds > 0) {
          this.outdoorCountdownSeconds -= 1
        }

        if (this.sunscreenCountdownSeconds > 0) {
          this.sunscreenCountdownSeconds -= 1
        }

        if (this.outdoorCountdownSeconds <= 0) {
          this.sendShadeReminder()
          this.stopReminders(false)
          this.reminderMessage = 'Outdoor session finished. Return indoors or seek shade.'
          return
        }

        if (this.sunscreenCountdownSeconds <= 0) {
          this.sendSunscreenReminder()
          this.sunscreenCountdownSeconds = this.reminderMinutes * 60
        }
      }, 1000)
    },

    stopReminders(showMessage = true) {
      if (this.countdownTimerId) {
        clearInterval(this.countdownTimerId)
        this.countdownTimerId = null
      }

      this.reminderActive = false
      this.resetCountdowns()

      if (showMessage) {
        this.reminderMessage = 'Protection timer stopped.'
      }
    },

    sendBrowserNotice(text) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('UV Defender Reminder', {
          body: text
        })
      } else {
        alert(text)
      }
    },

    sendSunscreenReminder() {
      const text = `Time to reapply sunscreen. UV Index: ${this.localUVIndex}. Recommended protection: ${this.recommendedProtection.spf}.`
      this.sendBrowserNotice(text)
      this.reminderMessage = 'Sunscreen reminder sent. Timer restarted.'
    },

    sendShadeReminder() {
      const text = `Outdoor time reached. Return indoors or seek shade now. Current UV Index: ${this.localUVIndex}.`
      this.sendBrowserNotice(text)
    }
  },

  mounted() {
    this.resetCountdowns()
  },

  beforeUnmount() {
    this.stopReminders(false)
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

          <button v-if="!reminderActive" @click="startReminders">
            🔔 Start Reminders
          </button>

          <button v-else @click="stopReminders()">
            ⏹ Stop Reminders
          </button>

          <p v-if="reminderMessage" class="reminder-status">
            {{ reminderMessage }}
          </p>
        </div>

        <div class="timer">
          <p>Next Sunscreen Reminder</p>
          <strong>{{ formattedSunscreenCountdown }}</strong>

          <p style="margin-top:16px;">Outdoor Session Remaining</p>
          <strong>{{ formattedOutdoorCountdown }}</strong>
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
          <li>☂ {{ recommendedProtection.shadeText }}</li>
          <li>🔔 UV-linked interval shortens automatically at higher UV levels</li>
          <li>⏱ Outdoor session countdown ends with a shade reminder</li>
        </ul>
      </div>
    </article>
  `
}
