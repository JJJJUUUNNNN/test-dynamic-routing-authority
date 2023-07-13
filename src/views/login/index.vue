<template>
  <div class="login">
    <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="120px"
    status-icon
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="formData.name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">
        登录
      </el-button>
      <el-button @click="handleRegister">注册</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import router from '../../route';

const formData = ref({
  name: '',
  password:''
})

const formRef=ref()

const rules=ref({
  name:[{required:true,message:'用户名不能为空',trigger:'blur'}],
  password:[{required:true,message:'密码不能为空',trigger:'blur'}]
})

function handleLogin(){
  if(!formRef.value){
    return false
  }
  formRef.value.validate(validate=>{
    if(validate){
      console.log('666')
      setTimeout(() => {
        router.push('/home')
      }, 1000);
    }else{
      return false
    }
  })
}

function handleRegister(){
  router.push('/register')
}
</script>

<style lang="scss">
.login{
  width: 300px;
  height: 200px;
  background-color: skyblue;
  margin: 100px auto;
  padding: 30px;
}
</style>