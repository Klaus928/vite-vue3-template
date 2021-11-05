import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
const modules = import.meta.globEager('/src/views/**/router.ts')
const routeModuleList: any[] = routes
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
const router = createRouter({
  history: createWebHistory(),
  routes: routeModuleList // `routes: routes` 的缩写
})
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
