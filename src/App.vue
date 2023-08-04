<script setup>
import { usePush, Notivue, Notifications } from 'notivue';
import { sum } from './utils/calculator';
// # 参考 https://www.naiveui.com/zh-CN/os-theme/components/message

window.$push = usePush();
console.log(sum(0.1, 0.2));
defineOptions({
  name: 'APP',
});
</script>

<template>
  <Notivue #default="item">
    <Notifications :item="item" />
  </Notivue>

  <router-view></router-view>
</template>

<style scoped>
</style>
