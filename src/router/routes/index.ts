import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* @vite-ignore */ '@/views/main/index.vue')
  }
  // {
  //   path: '/hhhh',
  //   name: 'Test',
  //   component: () => import('@/components/Test.vue')
  // }
]
