import { defineStore } from "pinia";
import { setToken,removeToken } from '@/utils/cookies/index.js'
import router from "@/router";

export const useUserStore=defineStore({
  id:'user',
  state:()=>({
    token:'',
    userInfo:null
  }),
  actions:{
    updateToken(token){
      this.token=token
    },
    async login(){
      const myToken='test-token-key-lalala'
      setToken(myToken)
      this.updateToken(myToken)
      router.push("/home");
    },
    async logout(){
      removeToken()
    }
  },
})