import { defineStore } from "pinia";
import { setToken, removeToken } from "@/utils/cookies/index.js";
import { usePermissionStore } from "./permission";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({}),
  actions: {
    async login() {
      const myToken = "test-token-key-wjj";
      setToken(myToken);
    },
    async logout() {
      const permissionStore = usePermissionStore();
      permissionStore.resetMenu()
      removeToken();
    },
  },
});
