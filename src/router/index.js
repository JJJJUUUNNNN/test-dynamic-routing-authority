import { createRouter, createWebHistory } from 'vue-router';

export const contantRoutes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Layout',
    component: () => import('@/Layout/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: '注册',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: contantRoutes,
});

export default router;
