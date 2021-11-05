import type { App } from 'vue'
import obj from '@/api'
import { createPinia, defineStore } from 'pinia'
const store = createPinia()
const { apis, url } = obj

export const requestStoreList = []

const sysFiles: object = import.meta.globEager('./modules/*.ts')
const files = import.meta.globEager('/src/views/**/store.ts')

const modules = {}

Object.keys(sysFiles).forEach(key => {
  modules[key.replace(/(\.\/|modules\/|.ts)/g, '')] = {...(sysFiles[key].default || {})}
})

Object.keys(files).forEach(key => {
  modules[key.replace(/(\.\/|\.ts|\/src\/views\/|\/store|\/module)/g, '')] = {...(files[key].default || {})}
})

// const actions = {}
for (const module in url) {
  modules[module].actions = modules[module].actions ? {...modules[module].actions} : {};
  for (const name in apis[module]) {
    modules[module].actions[name] = (params = {}) => {
      return new Promise((resolve, reject) => {
        apis[module][name](params).then((res) => {
          if (res instanceof Blob) {
            resolve(res) //blob 直接返回res
          }
          let data
          if (res.code === 200) {
            if (res.data === null || res.data === undefined) {
              data = res
            } else {
              data = res.data
            }
            data = (
              url[module][name]['afterResponse'] ||
              function (data) {
                return data
              }
            )(data)
            resolve(data)
          } else {
            reject(res)
          }
        })
      })
    }
  }
  requestStoreList[module] = defineStore(module, {
    ...modules[module]
  })
}

export function setupStore(app: App<Element>) {
  app.use(store)
}
export { store }
