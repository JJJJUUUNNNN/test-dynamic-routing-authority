<template>
  <div class="login">
    <div class="form-item">
      <label for="username">用户名：</label>
      <input v-model="data.username" name="username" />
    </div>
    <div class="form-item">
      <label for="password">密码：</label>
      <input v-model="data.password" name="password" />
    </div>
    <div class="form-item">
      <label for="code">验证码：</label>
      <input v-model="data.code" />
    </div>
    <img :src="src" alt="" @click="getCode()" />
    <div class="form-item">
      <button @click="handleLogin()">登录</button>
      <button @click="push.error('Something good has been pushed!')">
        Push
      </button>
    </div>

    <div class="form-item">
      <router-link to="/about">about</router-link> -
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script setup>
import { usePush } from 'notivue';

import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { getCaptchaImage } from '@/api/login';

const userStore = useUserStore();
const push = usePush();
const data = ref({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
});

function handleLogin() {
  userStore.login(data.value).then((res) => {
    router.replace('/home');
  });
}

const base64 = ref('');
/**
 *
 * @param {string} url
 * @return {Promise<HTMLImageElement>}
 */
function getLoadedImg(url) {
  const img = document.createElement('img');
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
    img.src = url;
  });
}
async function aaa() {
  const s = getLoadedImg('/bb.png');
}
aaa();

function url2base64(url) {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  return getLoadedImg(url)
    .then(async (img) => {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      return getLoadedImg('/bb.png');
    })
    .then((img2) => {
      ctx.drawImage(img2, 22, 22, img2.width, img2.height);
      return canvas.toDataURL('image/png');
    });
}

// const url = 'http://vue.ruoyi.vip/prod-api/captchaImage';
const src = ref('');

function getCode() {
  getCaptchaImage().then((res) => {
    src.value = `data:image/gif;base64,${res.img}`;
    data.value.uuid = res.uuid;
    base64.value = res;
  });
}

getCode();
</script>

<style lang="scss">
.login {
  width: 250px;
  height: 300px;
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
