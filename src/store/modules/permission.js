import { defineStore } from 'pinia';
import router from '@/router';

// 模拟后台返回的菜单json
const dynamicRoutes = [
  {
    path: '/home',
    url: 'home',
  },
  {
    path: '/about',
    url: 'about',
    meta: {
      name: '关于',
    },
  },
  {
    path: '/account',
    url: 'account',
    meta: {
      name: '个人中心',
    },
  },
];

const _404 = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/error/404.vue'),
  name: '404',
  meta: {
    title: '404',
  },
};

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    // 存动态路由
    menus: [],
  }),
  getters: {
    // 判断是否获取过动态路由
    isGettedMenus: (state) => state.menus.length != 0,
  },
  actions: {
    // 生成动态路由 此处的添加必须添加两个地方!  store中的menus和router中的路由
    //  store的menus只是存了个变量
    // 真正动态菜单应该使用 router.addRoute
    generateMenus() {
      return new Promise((resolve, reject) => {
        // 1. store的菜单中要存入后台返回的菜单
        this.menus = dynamicRoutes;
        dynamicRoutes.forEach((navigation) => {
          // 2. 路由中要添加后台返回的菜单
          router.addRoute('Layout', {
            path: navigation.path,
            name: navigation.url,
            component: () => import(`../../views/${navigation.url}/index.vue`),
          });
        });
        // 添加404
        router.addRoute(_404);
        resolve();
      });
    },
    // 退出登录的时候,应该清空初始化时添加的所有动态路由信息和登录状态(移除token)
    // 此处的清空必须清空两个地方!  store中的menus和router中的路由
    resetMenu() {
      this.menus.forEach((navigation) => {
        router.removeRoute(navigation.url);
      });
      router.removeRoute(_404.name);
      this.$reset(); // 此方法可以一举把state中所有变量的值重置为初始值,在此处就等价于 this.menus=[]
    },
  },
});
