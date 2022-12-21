import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

// deps
import App from './App.vue'

import router from './router'

// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

const app = createApp(App)
app.use(ElementPlus)

app.use(createPinia()).use(router).mount('#app')
