import { App } from 'vue'
const components = []
export function registerGlobComp(app: App): void {
  // register Global Component here
  components.forEach((item) => {
    app.component(item.name, item)
  })
}
