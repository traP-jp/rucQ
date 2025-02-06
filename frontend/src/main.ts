import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          black: '#000000',
          gray: '#444444',
          lightgray: '#aaaaaa',
          white: '#f6f6f6',
          exwhite: '#ffffff',

          orange: '#ff7300',
          orangePale: '#ffe2b2',
          green: '#178000',
          greenPale: '#ccffc1',
          red: '#ff4d00',
          redPale: '#ffc9b2',
          blue: '#008cff',
          bluePale: '#9dd8ff',
          navy: '#2444a4',
          navyPale: '#afc3ff',

          text: '#000000', // var(--color-black)
          background: '#f6f6f6', // var(--color-background)
          surface: '#f6f6f6',
          primary: '#ff7300', // var(--color-orange)
          secondary: '#ffe2b2', // var(--color-orange-pale)
          error: '#ff4d00', // var(--color-red)
        },
      },
    },
  },
})

// 調べた限りでは、Vuetify のテーマ設定は基本的にこの createVuetify の中をいじって行うらしい
// base.css の色定義は準備が整い次第廃止したい

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
