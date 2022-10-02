import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/views/Layout-index'
import Home from '@/views/home'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub'

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
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面最顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
