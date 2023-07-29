import router from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/cookies';

const whiteList = ['/login', '/register', '/404'];

router.beforeEach(async (to, from, next) => {
  const permissionStore = usePermissionStore();
  const userStore = useUserStore();
  /**
   * 路由拦截逻辑：
   * 1. 判断有没有token：
   *  有：判断是否在登录，或者注册页面，如果有token的情况下进入登录注册页面则重定向到首页。
   * 没有：判断页面是否在白名单中，在就直接跳转，否则，重定向到登录页
   *
   * 登录之后：
   *  先看有没有动态菜单，用户信息什么的，没有，就得全局store获取(添加)一遍，获取过后就不在获取了，除非重新打开或者刷新页面，页面回到初始状态才需要重新获取。
   */
  if (getToken()) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home');
    } else if (!permissionStore.isGettedMenus) {
      // 添加动态路由
      await permissionStore.generateMenus()
        .then(() => {
          return userStore.getUserInfo();
        }).then((res) => {
          console.log(res);
          return permissionStore.getAsyncRouters();
        }).then((res) => {
          // 添加路由的过程和页面渲染过程是同时进行的，所以，当路由添加好的一瞬间，页面可能还没反应过来，从而就会导致页面找不到，打开之后什么都没有的情况，因此就需要把replace设置为true，来让他及时的刷新一次以及时同步好动态路由。

          // 因此,应该写next({ ...to, replace: true }) 而不是next()
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
          console.log(res);
        });

      // 获取过么直接next
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    next();
  } else {
    next('/login');
  }
});
