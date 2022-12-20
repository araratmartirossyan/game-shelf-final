import { App } from '@vue/runtime-core'
import { defineAsyncComponent } from 'vue'

import {
  ElMessage,
  ElMessageBox,
  ElTag,
  ElAvatar,
  ElInput,
  ElOption,
  ElSelect,
  ElFormItem,
  ElForm,
  ElUpload,
  ElButton
} from 'element-plus'

const TgPage = defineAsyncComponent(
  () => import('@/components/layout/Page.vue')
)

export const installComponents = (app: App) => {
  const components = [
    { name: 'tg-page', component: TgPage },
    { name: 'ElTag', component: ElTag },
    { name: 'ElAvatar', component: ElAvatar },
    { name: 'ElInput', component: ElInput },
    { name: 'ElOption', component: ElOption },
    { name: 'ElSelect', component: ElSelect },
    { name: 'ElFormItem', component: ElFormItem },
    { name: 'ElForm', component: ElForm },
    { name: 'ElUpload', component: ElUpload },
    {
      name: 'ElButton',
      component: ElButton
    }
  ]

  const plugins = [ElMessage, ElMessageBox]

  components.forEach(({ name, component }) => {
    app.component(name, component)
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
