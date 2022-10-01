import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/Main')
  },
  {
    path: '/detial',
    name: 'detial',
    component: () => import('@/views/Detial')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/main'
  }
]

export default routes
