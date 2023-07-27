<script setup>
import { Notivue, Notifications } from 'notivue';
</script>

<template>
  <Notivue v-slot="item">
    <Notifications :item="item" />
  </Notivue>

  <router-view></router-view>
</template>

<style scoped>
</style>
