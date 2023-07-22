import { defineStore } from "pinia";
import router from "@/router";

export const dynamicRoutes = [
  {
    path: "/home",
    url: "home",
  },
  {
    path: "/about",
    url: "about",
    meta: {
      name: "关于",
    },
  },
  {
    path: "/account",
    url: "account",
    meta: {
      name: "个人中心",
    },
  },
];

const _404 = {
  path: "/:pathMatch(.*)*",
  component: () => import("@/views/error/404.vue"),
  name: "404",
  meta: {
    title: "404",
  },
};

export const usePermissionStore = defineStore({
  id: "permission",
  state: () => ({
    menus: [],
  }),
  getters: {
    isGettedMenus: (state) => state.menus.length != 0,
  },
  actions: {
    generateMenus() {
      return new Promise((resolve, reject) => {
        this.menus = dynamicRoutes;
        dynamicRoutes.forEach((navigation) => {
          router.addRoute({
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

    resetMenu() {
      this.menus.forEach((navigation) => {
        router.removeRoute(navigation.url);
      });
      router.removeRoute(_404.name);
      this.$reset();
    },
  },
});
