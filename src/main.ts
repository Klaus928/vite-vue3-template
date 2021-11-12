import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { registerGlobComp } from '@/components/registerGlobComp'
import Request from '@/service'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import '@/assets/css/base.less'
const app = createApp(App)
// 注册自定义全局组件
registerGlobComp(app)
// 注册路由
setupRouter(app)
// 注册状态管理
setupStore(app)
app.config.globalProperties.$http = Request
app.mount('#app')
