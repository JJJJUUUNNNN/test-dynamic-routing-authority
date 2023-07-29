<script setup>
import { usePush, Notivue, Notifications } from 'notivue';
// # 参考 https://www.naiveui.com/zh-CN/os-theme/components/message

window.$push = usePush();
</script>

<template>
  <Notivue #default="item">
    <Notifications :item="item" />
  </Notivue>

  <router-view></router-view>
</template>

<style scoped>
</style>
