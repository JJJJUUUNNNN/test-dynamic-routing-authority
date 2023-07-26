<template>
  <div class="login">
    <div class="form-item">
      <button @click="handleLogin()">登录</button>
    </div>
    <router-link to="/about">about</router-link> -
    <router-link to="/register">注册</router-link>
    <img :src="base64" alt="" />
  </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { wjjRequest } from '@/utils/request';
import { WjjPromise } from '@/utils/promise';

const userStore = useUserStore();

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
      reject(e);
    };
    img.src = url;
  });
}
/**
 *
 * @param {string} url
 * @return {Promise<string>}
 */
function url2base64(url) {
  return new WjjPromise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    console.time('1 way');
    getLoadedImg(url)
      .then(async (img) => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        return getLoadedImg('/bb.png');
      })
      .then((img2) => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img2, 22, 22, img2.width, img2.height);
        console.timeEnd('1 way');
        resolve(canvas.toDataURL('image/png'));
      });
  });
}

const url = 'http://vue.ruoyi.vip/prod-api/captchaImage';
const src = ref('');

wjjRequest(
  {
    url,
    method: 'get',
  },
).then((res) => {
  src.value = `data:image/gif;base64,${res.img}`;
  return url2base64(src.value);
}).then((res) => {
  base64.value = res;
}).catch((err) => {
  console.log('catch:', err);
});

// getVideoDuration('/demo.mp4').then((res) => {
//   console.log('duration', res);
// }).catch((err) => {
//   console.log(err);
// });

// new WjjPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('成功！！！');
//   }, 1000);
// }).then(
//   (res) => {
//     console.log('success:', res);
//   },
//   (error) => {
//     console.log('fail:', error);
//   },
// );
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
