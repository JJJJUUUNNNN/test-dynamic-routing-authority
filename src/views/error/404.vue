<template>
  <div class="error">
    <h1>404</h1>
    <el-button @click="handleBack" type="primary">返回</el-button>
  </div>
</template>

<script setup>
import router from '@/route';


function handleBack(){
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.error{
  width: 100%;
  text-align: center;
  margin-top: 200px;

  h1{
    font-size: 100px;
  }
}
</style>