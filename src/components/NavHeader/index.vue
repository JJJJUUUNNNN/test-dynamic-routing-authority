<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="my logo" />
    </div>
    <ul class="nav">
      <li>
        <!-- 用a标签 跳转的时候会刷新网页，router-link不会 -->
        <router-link class="nav-item" to="/home">首页</router-link>
      </li>
      <li>
        <router-link class="nav-item" to="/account">个人中心</router-link>
      </li>
      <li>
        <router-link class="nav-item" to="/about">关于</router-link>
      </li>
    </ul>
    <div class="user" @click="isShow = !isShow">
      <img src="@/assets/user.png" alt="user" />
      <span>junjun</span>
      <ul v-if="isShow" class="dropdown">
        <li>
          <router-link to="/change-password">修改密码</router-link>
        </li>
        <li>
          <button @click="logout">退出登录</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import router from "@/router";

const userStore = useUserStore();
const isShow = ref(false);
defineOptions({
  name:'LayoutNav'
})
function logout() {
  userStore.logout();
  router.replace("/");
  /**
   * location.href 表示在当前窗口重定向到新页面，打开并刷新 ，应用所有状态都回到了初始状态。用了这个就不用再单独去logout方法中把store的菜单列表清空。
   */
  // location.href = '/';
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}

li.active,
.router-link-exact-active
{
  background: blue;
  color: #fff !important;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
  padding: 10px;

  .logo {
    width: 150px;

    img {
      width: 100%;
      height: 52px;
      cursor: pointer;
    }
  }

  .nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 600px;
    height: 52px;
    color: #000;
    font-size: 16px;

    li {
      list-style: none;
      padding: 5px;
      margin-right: 5px;

      .nav-item {
        text-decoration: none;
        color: #000;
      }
    }
  }

  .user {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      margin-right: 10px;
      border-radius: 50%;
    }
  }

  .dropdown {
    position: absolute;
    bottom: -74px;
    left: 5px;
    list-style: none;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    li {
      margin: 10px;

      a {
        text-decoration: none;
        color: #000;
        font-size: 14px;
      }
    }
  }
}
</style>
