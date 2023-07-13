<template>
  <el-container class="container" style="height: 700px">
    <el-header style="text-align: right; font-size: 12px">
      <ul class="nav">
        <li @click="router.push('/home')">首页</li>
        <li @click="router.push('/account')">个人中心</li>
        <li @click="router.push('/about')">关于</li>
      </ul>
      <div class="toolbar">
        <el-dropdown>
          <span>JunJun</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/login')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
      <el-container class="main-container">
        <el-main>
          <el-scrollbar>
            <slot></slot>
          </el-scrollbar>
        </el-main>
        <el-footer height="30px">Copyright © wangjunjun</el-footer>
      </el-container>
  </el-container>
</template>

<script setup>
import router from '@/route';
</script>

<style lang="scss" scoped>
.container {
  .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    color: var(--el-text-color-primary);
  }

  .el-footer {
    background-color: #f0f2f5;
    text-align: center;
  }

  .el-menu {
    border-right: none;
  }

  .el-main {
    padding: 20px;
    background-color: #f0f2f5;
  }

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
}
</style>