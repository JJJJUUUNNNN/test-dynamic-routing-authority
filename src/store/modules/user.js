import { defineStore } from 'pinia';
import { setToken, removeToken } from '@/utils/cookies/index';
import { usePermissionStore } from './permission';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({}),
  actions: {
    // 登录 登录成功后就得给用户设置一个token以表示登录状态进行中
    async login() {
      const myToken = 'test-token-key-wjj';
      // 用cookies保存token
      // 设置token
      setToken(myToken);
    },
    // 退出登录时 要清空登录状态-移除token 并清空所有动态路由
    async logout() {
      const permissionStore = usePermissionStore();
      // 清空动态路由
      permissionStore.resetMenu();
      // 移除token
      removeToken();
    },
  },
});
