import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

import { useUserStore } from './store'
const userStore = useUserStore()

const initializeUserStore = async () => {
  const res = await fetch('/api/me')
  userStore.userId = await res.text()
}

initializeUserStore().catch((error) => {
  console.error('Failed to initialize user store:', error)
})

app.mount('#app')
