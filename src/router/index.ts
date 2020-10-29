import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/components/layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/advert',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue'),
      },
    ],
  },
  {
    path: '/advert-space',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue'),
      },
    ],
  },
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'course',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/course/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
  },
  {
    path: '/menu',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/menu/index.vue'),
      },
    ],
  },
  {
    path: '/resource',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/resource/index.vue'),
      },
    ],
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'role',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/role/index.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'user',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/user/index.vue'),
      },
    ],
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/error-page/404.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
