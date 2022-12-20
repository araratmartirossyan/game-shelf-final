import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import urql from '@urql/vue'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

// deps
import App from './App.vue'

import router from './router'

// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import { installComponents } from './utils/components.util'

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

const app = createApp(App)
app.use(ElementPlus)
installComponents(app)

app
  .use(createPinia())
  .use(urql, { url: 'https://myshelf.incodewetrust.dev/graphql' })
  .use(router)
  .mount('#app')
