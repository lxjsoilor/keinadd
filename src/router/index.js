import Vue from 'vue'
import Router from 'vue-router'
import { PcCookie, enums } from '../utils'

import home from '@/pages/home/index'
import detail from '@/pages/home/detail'
import shop from '@/pages/home/shop'
import addstore from '@/pages/home/addstore'
import addgoods from '@/pages/home/addgoods'
import goodsdetail from '@/pages/home/goodsdetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/',name: 'base',redirect: 'home'},
    {path: '/home',name: 'home',component: home},
    {path: '/detail',name: 'detail',component: detail},
    {path: '/shop',name: 'shop',component: shop},
    {path: '/addstore',name: 'addstore',component: addstore},
    {path: '/addgoods',name: 'addgoods',component: addgoods},
    {path: '/goodsdetail',name: 'goodsdetail',component: goodsdetail},
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  next()
  // 判断是否登录状态，未登录直接跳转到登录页
  // if(judgeIsLogin()) { //已经登录
  //   if(to.name == 'login') {
  //     next('/home')
  //   }else {
  //     next()
  //   }
  // }else { //没有登录
  //   // 如果没有token获取token存入cookie
  //   if(!PcCookie.get(enums.USER.TOKEN)) {
  //     GetToken({Phone: '1'}).then(result => {
  //       if(!!result && typeof result == 'string') {
  //         PcCookie.set({
  //           key: enums.USER.TOKEN,
  //           value: result
  //         })
  //         if(to.name === 'illustrate') {
  //           next();
  //         }else if(to.name != 'login' && to.name != 'register') {
  //           next('/login');
  //         }else {
  //           next();
  //         }
  //       }else {
  //         alert('获取token失败，请退出重试！')
  //       }
  //     })
  //   }else {
  //     if(to.name === 'illustrate') {
  //       next();
  //     }else if(to.name != 'login' && to.name != 'register') {
  //       next('/login');
  //     }else {
  //       next()
  //     }
  //   }
  // }
})

export default router
