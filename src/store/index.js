import { defineStore } from "pinia";

export const useUserStore=defineStore({
  id:'user',
  state:()=>({
    token:'',
    userInfo:null
  }),
  actions:{
    setToken(token){
      this.token=token
    },
    setUserInfo(userInfo){
      this.userInfo=userInfo
    },
    async logout(){

    }
  },
  // persist:true
})