import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import filters from '@/filters'
// 加载全局样式
import './styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 过滤器
Object.keys(filters).forEach(k => Vue.filter(k, (filters as any)[k]))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
