import router from '@/route'
import { useUserStore } from '@/store'


const whiteList=['/login','/register','/404']

router.beforeEach(async(to,from,next)=>{
const userStore=useUserStore()

  console.log(userStore.token)

  if(userStore.token){
    if(to.path==='/login'){
      next('/')
    }else{
      next()
    }
  }else{
    if(whiteList.indexOf(to.path)>-1){
      next()
    }else{
      next('/login')
    }
  }
})