import Home from './component/home.vue'
import Article from './component/article.vue'
import About from './component/about.vue'
import arcDetail from './component/arcDetail.vue'
import classs from './component/class.vue'
import Not from './component/404.vue'

import Login from './component/admin/login.vue'
import bgIndex from './component/admin/index.vue'

export default [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/article',
    component: Article
  },
  {
     path: '/admin',
     component: bgIndex,
     meta: {
       requireAuto: true
     }
  },
  {
    path: '/Login',
    component:Login
  },
  {
    path: '/detail',
    component: arcDetail
  },
  {
    path: '/class/:val',
    component: classs
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/404',
    component: Not
  },
  {
    path: '*',
    redirect: '/404'
  }
]
