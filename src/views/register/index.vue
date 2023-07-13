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
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="formData.confirmPassword" placeholder="请再次输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import router from '../../route';

const formData = ref({
  name: '',
  password:'',
  confirmPassword:''
})

const formRef=ref()

const rules=ref({
  name:[{required:true,message:'用户名不能为空',trigger:'blur'}],
  password:[{required:true,message:'密码不能为空',trigger:'blur'}],
  confirmPassword:[{required:true,message:'请再次输入密码',trigger:'blur'}]
})

function handleSubmit(){
  if(!formRef.value){
    return false
  }
  formRef.value.validate(validate=>{
    if(validate){
      console.log('注册成功，请登录！')
      setTimeout(() => {
        router.push('/login')
      }, 1000);
    }else{
      return false
    }
  })
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