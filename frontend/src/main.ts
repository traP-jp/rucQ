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
          background: '#f6f6f6', // var(--color-background)
          surface: '#f6f6f6',
          primary: '#ff7300', // var(--color-orange)
          secondary: '#ffe2b2', // var(--color-orange-pale)
          error: '#ff4d00', // var(--color-red)
          text: '#000000', // var(--color-black)
        },
      },
    },
  },
})

// 調べた限りでは、Vuetify のテーマ設定は基本的にこの createVuetify の中をいじって行うらしい
// 全面的に Vuetify 製コンポーネントを採用する場合、基本的な色の設定は base.css ではなくこちらで行うべき
// ただし、イベントブロックなど色付きの情報を扱う場合は base.css も依然として必要ではありそう

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
