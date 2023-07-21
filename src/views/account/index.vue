<template>
  <div>
    <Layout>
      <h1>个人中心</h1>
      <button @click="$router.push('/change-password')">修改密码</button>
    </Layout>
  </div>
</template>

<script setup>
import Layout from '@/Layout/index.vue'

</script>

<style lang="scss" scoped>

</style>