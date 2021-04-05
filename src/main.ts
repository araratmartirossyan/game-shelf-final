import { createApp } from 'vue'
import urql from '@urql/vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// deps
import App from './App.vue'
import router from "./router";

// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
})

const app = createApp(App)

app.use(urql, { url: 'https://graph.myshelf.info/graphql' })
app.use(router)
app.use(ElementPlus)
app.mount('#app')
