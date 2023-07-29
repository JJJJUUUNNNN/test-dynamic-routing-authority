<template>
  <div class="container">
    <NavHeader></NavHeader>
    <section>
      <aside>
        ????
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </section>
    <footer height="30px">Copyright © wangjunjun</footer>
  </div>
</template>

<script setup>
import NavHeader from '@/components/NavHeader/index.vue';

defineOptions({
  name: 'LayoutView',
});
</script>

<style lang="scss" scoped>
section{
  display: flex;
  aside{
    width:  200px;
    border-right: 1px solid;
  }
  main{
    flex: 1;
  }
}
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
