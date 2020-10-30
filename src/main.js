import Vue from 'vue'
import App from './App'
import store from './store'
import MinCache from './plugins/cache/MinCache'
import MinRequest from './plugins/request/MinRequest'
import MinRouter from './plugins/router/MinRouter'
import MinEventBus from './plugins/EventBus/MinEventBus'

import request from '@/plugins/request'
import router from '@/plugins/router'
// import plugins from './components/index'

// Vue.use(plugins)

// 注册路由
Vue.use(MinRouter)

// 注册缓存器
Vue.use(MinCache)

// 注册请求
Vue.use(MinRequest)

//注册eventbus
Vue.use(MinEventBus)

Vue.config.productionTip = false

Vue.prototype.$toast = (msg) => {
  uni.showToast({
    icon: 'none',
    title: msg
  })
}

App.mpType = 'app'
App.minRouter = router;
App.minRequest = request;

const app = new Vue({
  store,
  ...App
})
app.$mount()
