import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import urql from '@urql/vue'

import 'element-plus/lib/theme-chalk/index.css';

// deps
import App from './App.vue'

import router from "./router";

// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import { installComponents } from './utils/components.util'

registerSW({
  onNeedRefresh() { },
  onOfflineReady() { },
})

const app = createApp(App)

installComponents(app)

app.use(createPinia())
  .use(urql, { url: 'https://graph.myshelf.info/graphql' })
  .use(router)
  .mount('#app')
