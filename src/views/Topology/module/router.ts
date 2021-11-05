import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/Topology',
    name: 'Topology',
    component: () => import(/* @vite-ignore */ '../index.vue')
  }
]
export default routes
