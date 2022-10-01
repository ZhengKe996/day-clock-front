import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './styles/index.scss'
import router from './router'
import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(router).use(Antd)
app.mount('#app')
