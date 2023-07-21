<template>
  <div class="error">
    <h1>404</h1>
    <p>页面不见了</p>
    <button @click="handleBack">返回</button>
  </div>
</template>

<script setup>
import router from '@/router';


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