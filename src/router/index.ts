import { createRouter, createWebHashHistory } from 'vue-router'
import Routes from './routes'

const router = createRouter({
  routes: Routes,
  history: createWebHashHistory()
})

export default router
