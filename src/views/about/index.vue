<template>
  <div>
    <Layout>
      <h1>关于页面</h1>
      1. 页面 
      （1）带导航栏的页面 
      （2）不带导航的页面也就是全屏页面 
      （3）白名单页面：不需要登录即可访问
  
      全屏： 
      登录页面（白名单）
      注册页面（白名单）
      404 页面（此页面是不是白名单自行判断）
  
      带导航的页面： 
      首页
      个人中心
      关于页面
    </Layout>
  </div>
</template>

<script setup>
import Layout from '@/Layout/index.vue'

</script>

<style lang="scss" scoped>

</style>