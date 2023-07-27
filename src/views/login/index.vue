<template>
  <div class="login">
    <div class="form-item">
      <button @click="handleLogin()">登录</button>

      <button @click="push.error('Something good has been pushed!')">Push</button>
    </div>
    <router-link to="/about">about</router-link> -
    <router-link to="/register">注册</router-link>
    <img :src="src" alt="" />
    <input v-model="code" />
   <button @click="login()">login</button>
  </div>
</template>

<script setup>
import { usePush } from 'notivue';

import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { wjjRequest } from '@/utils/request';
import { WjjPromise } from '@/utils/promise';
import { getToken } from '@/utils/cookies';

const code = ref('');
const uuid = ref('');
const userStore = useUserStore();
const push = usePush();

function handleLogin() {
  userStore.login();
  router.replace('/home');
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
      console.log('imge:', e);
      reject(e);
    };
    img.src = url;
  });
}

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

wjjRequest(
  {
    url: '/captchaImage',
    method: 'get',

  },
).then((res) => {
  src.value = `data:image/gif;base64,${res.img}`;
  uuid.value = res.uuid;
  base64.value = res;
});

function login() {

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
