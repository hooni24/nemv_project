import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: '사용자',
      component: () => import('./views/user.vue')
    },
    {
      path: '/group-bg',
      name: 'group-bg',
      component: () => import('./views/group-bg.vue')
    },
    {
      path: '/header',
      name: '헤더',
      component: () => import('./views/header.vue'),
      beforeEnter: (to, from, next) => {
        // 네비게이션 가드.
        // console.log(to)
        // console.log(from)
        if (!localStorage.getItem('token')) return next('block')
        next()
      }
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign.vue')
    },
    {
      path: '/block',
      name: 'block',
      component: () => import('./views/block.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
