<template>
  <div class="login">
    <form ref="formRef" :model="formData" :rules="rules" @submit="handleLogin">
      <div class="form-item">
        <label for="userName">用户名:</label>
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
        <label for="password">密码:</label>
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
      </div>
    </form>
    <router-link to="/about">about</router-link> -
    <router-link to="/register">注册</router-link>
    {{ a }}
    {{b }}
  </div>
</template>

<script setup>
import router from "@/router";
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from "vue-router";


const userStore = useUserStore();
const permissionStore = usePermissionStore();

const formData = ref({
  userName: "test",
  password: "123456",
});
const a = computed(()=>permissionStore.menus)
const b = computed(()=>router.getRoutes().map(e=>e.path))
const formRef = ref();
const userNameRef = ref();
const passwordRef = ref();
const errorRef = ref();

const rules = ref({
  name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

function handleLogin(e) {
  e.preventDefault();
  userStore.login();
  router.replace("/home");
}

function handleRegister() {
  router.push("/register");
}
</script>

<style lang="scss">
.login {
  width: 250px;
  height: 200px;
  background-color: skyblue;
  margin: 100px auto;
  padding: 30px;

  .form-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      width: 80px;
    }

    input {
      border: unset;
      height: 30px;
      padding-left: 5px;
    }

    button {
      border: unset;
      height: 30px;
      width: 50px;
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .btn-register {
    border: unset;
    height: 30px;
    width: 50px;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
