import { createRouter,createWebHistory } from "vue-router"

export const contantRoutes=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/login',
    component:()=>import('@/views/login/index.vue'),
    meta:{
      title:'登录'
    }
  },
  {
    path:'/home',
    component:()=>import('@/views/home/index.vue')
  },
  {
    path:'/register',
    component:()=>import('@/views/register/index.vue'),
    meta:{
      title:'注册'
    }
  },
  {
    path:'/:pathMatch(.*)*',
    component:()=>import('@/views/error/404.vue'),
    meta:{
      title:'404'
    }
  }
]

export const dynamicRoutes=[
  {
    path:'/about',
    component:()=>import('@/views/about/index.vue'),
    meta:{
      name:'关于'
    }
  },
  {
    path:'/account',
    component:()=>import('@/views/account/index.vue'),
    meta:{
      name:'个人中心'
    }
  }
]

const router= createRouter({
  history:createWebHistory(),
  routes: [...contantRoutes,...dynamicRoutes]
})

export default router