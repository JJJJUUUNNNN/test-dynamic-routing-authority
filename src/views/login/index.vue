<template>
  <div class="login">
    <form ref="formRef" :model="formData" :rules="rules" @submit="handleLogin">
      <div class="form-item">
        <label for="userName" 
          >用户名:</label>
          <input
            ref="userNameRef"
            name="userName"
            type="text"
            v-model="formData.userName"
            placeholder="请输入用户名"
            required
          />
        
      </div>
      <div class="form-item">
        <label for="password"
          >密码:</label>
          <input
            ref="passwordRef"
            name="password"
            type="password"
            v-model="formData.password"
            placeholder="请输入密码"
            required
            minlength="6"
            maxlength="12"
          />
        
      </div>
      <span ref="errorRef" aria-live="polite"></span>
      <div class="form-item">
        <button>登录</button>
        <button @click="handleRegister">注册</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import router from "@/route";
import { useUserStore } from '@/store'

const userSore=useUserStore()

const formData = ref({
  userName: "",
  password: "",
});

const formRef = ref();
const userNameRef = ref();
const passwordRef = ref();
const errorRef=ref()

const rules = ref({
  name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

function handleLogin(e) {
  e.preventDefault()
  userSore.setToken('token-test-key')
  setTimeout(() => {
    router.push("/home");
  }, 1000);
}

function handleRegister() {
  router.push("/register");
}
</script>

<style lang="scss">
.login {
  width: 250px;
  height: 150px;
  background-color: skyblue;
  margin: 100px auto;
  padding: 30px;

  .form-item{
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    label{
      width: 80px;
    }

    input{
      border: unset;
      height: 30px;
      padding-left: 5px;
    }

    button{
      border: unset;
      height: 30px;
      width: 50px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
