<template>
  <div class="login">
    验证码：
    <image src="" width="200" height="100"></image>
    <div class="form-item">
      <button @click="handleLogin()">登录</button>
    </div>
    <router-link to="/about">about</router-link> -
    <router-link to="/register">注册</router-link>

    <img :src="src" alt="">
  </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { wjjRequest } from '@/utils/request';

const userStore = useUserStore();

const url = 'http://vue.ruoyi.vip/prod-api/captchaImage';
const src = ref('');
function handleLogin() {
  userStore.login();
  router.replace('/home');
}

function getSizeByUrl(_url, cb) {
  const img = document.createElement('img');
  img.src = _url;

  const size = {
    width: 0,
    height: 0,
  };

  img.onload = () => {
    size.width = img.width;
    size.height = img.height;
    console.log(`onload 验证码图片大小为2222:${size.width}x${size.height}`);
    cb(size);
  };
}

wjjRequest({
  url,
  method: 'get',
  onSuccess(res) {
    console.log({ res });
    src.value = `data:image/gif;base64,${res.img}`;
    const size = getSizeByUrl(src.value, (size) => {
      console.log('size', size);
    });
  },
});

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
