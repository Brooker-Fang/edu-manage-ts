import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/error-page/404.vue'),
  },
  {
    path: '/',
    component: Layout,
    // 是否需要权限
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue'),
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue'),
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue'),
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/course/index.vue'),
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/menu/index.vue'),
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/menu/create.vue'),
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/resource/index.vue'),
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/role/index.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/user/index.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // ...
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath // 登录成功后要进入的页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
