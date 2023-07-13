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

const router= createRouter({
  history:createWebHistory(),
  routes: contantRoutes
})

export default router