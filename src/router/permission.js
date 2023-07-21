import router from "@/router";
import { useUserStore } from "@/store";
import { getToken } from '@/utils/cookies/index.js'

const whiteList = ["/login", "/register", "/404"];
const tokenKey=getToken()

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (userStore.token!==''||tokenKey) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
