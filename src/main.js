import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import { useAuthStore } from './store/auth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')

// Auto-logout when tab is closed or page is refreshed
const auth = useAuthStore()
window.addEventListener('beforeunload', () => {
  auth.logoutOnClose()
})