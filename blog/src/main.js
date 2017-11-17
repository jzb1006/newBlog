import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import jquery from '../node_modules/jquery/dist/jquery.js'
import axios from 'axios'
import loading from './component/loading'
import animate from '../node_modules/animate.css/animate.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


import stores from './store/store'

import routes from './router.config.js'
Vue.use(MuseUI)
Vue.use(VueRouter)
Vue.use(loading)
Vue.use(mavonEditor)
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;


const router=new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
   if (to.meta.requireAuto){
     axios.get('/login').then((res)=>{
       if(res.data){
         next()
       }else{
         next({
           path:'/Login',
           query:{redirect: to.fullPath}
         })
       }
     })
   }else if (to.fullPath=='/Login') {
     axios.get('/login').then((res)=>{
       console.log(to.fullPath);
       if(res.data){
         next({
           path:'/admin',
           query:{redirect: to.fullPath}
         })
       }else{
         next({
           path:'/Login',
           query:{redirect: to.fullPath}
         })
       }
     })
   }else{
     next();
   }
})


axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('开始请求')
    // console.log(`请求地址: ${config.url}`)
    stores.dispatch('LOADING_SHOW')
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
  
axios.interceptors.response.use(function (config) {
    // Do something before request is sent
    // console.log('接收响应')
    stores.dispatch('LOADING_HIDE')
    return config
  }, function (error) {
    // Do something with request error
    stores.dispatch('LOADING_HIDE')
    alert('网络出错')
    return Promise.reject(error)
  })


axios.defaults.timeout = 5000


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store:stores
})
