<template>
    <div class="container">
      <header style="text-align: right; font-size: 12px">
      <ul class="nav">
        <li @click="router.push('/home')">首页</li>
        <li @click="router.push('/account')">个人中心</li>
        <li @click="router.push('/about')">关于</li>
      </ul>
      <div class="toolbar">
        <!-- <el-dropdown>
          <span>JunJun</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/login')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer height="30px">Copyright © wangjunjun</footer>
    </div>
</template>

<script setup>
import router from '@/route';
</script>

<style lang="scss" scoped>
.container{
 
  .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }

  .nav{
    flex: 2;
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
    list-style: none;
    width: 500px;
    color:#000;
    font-size: 16px;

    li{
      margin-left: 20px;
      padding: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  footer{
    background-color: #ccc;
    text-align: center;
    margin-top: 400px;
  }
}
</style>