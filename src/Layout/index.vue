<template>
  <div class="container">
    <NavHeader></NavHeader>
    <main>
      <slot></slot>
    </main>
    <footer height="30px">Copyright © wangjunjun</footer>
  </div>
</template>

<script setup>
import NavHeader from '@/components/NavHeader/index.vue'
defineOptions({
  name:'LayoutView'
})
</script>

<style lang="scss" scoped>
.container {
  footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    text-align: center;
  }
}
</style>
