import router from "@/router";
import { usePermissionStore, dynamicRoutes } from "@/store/modules/permission";
import { getToken } from "@/utils/cookies/index.js";

const whiteList = ["/login", "/register", "/404"];

router.beforeEach(async (to, from, next) => {
  const usePermission = usePermissionStore();
  if (getToken()) {
    if (to.path === "/login" || to.path === "/register") {
      next("/home");
    } else {
      // if(是否获取过动态菜单) 没获取过则去获取
      if (usePermission.menus.length === 0) {
      await  usePermission.generateMenus().then(()=>{
        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
      })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
