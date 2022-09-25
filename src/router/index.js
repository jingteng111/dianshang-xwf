import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/views/Layout-index'
import Home from '@/views/home'

// 路由规则
const routes = [
  // 一级路由规则
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
