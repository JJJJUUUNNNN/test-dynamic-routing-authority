<template>
  <div class="login">
      <div class="form-item">
        <button @click="handleLogin()">登录</button>
      </div>
    <router-link to="/about">about</router-link> -
    <router-link to="/register">注册</router-link>
  </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

function handleLogin() {
  userStore.login();
  router.replace('/home');
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
