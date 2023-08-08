<template>
  <div class="container">
    <NavHeader></NavHeader>
    <section>
      <!-- <LayoutAside :menu="permissionStore.asyncMenus"></LayoutAside> -->
      <main>
        <router-view></router-view>
      </main>
    </section>
    <footer height="30px">Copyright © wangjunjun</footer>
  </div>
</template>

<script setup>
import NavHeader from '@/components/NavHeader/index.vue';
import LayoutAside from '@/components/LayoutAside.vue';
import { usePermissionStore } from '@/store/modules/permission';
import './index';

defineOptions({
  name: 'LayoutView',
});
const permissionStore = usePermissionStore();

function myLog(msg, level = 0) {
  const indent = (Array.from({ length: level }).map(() => '  ')).join(' ');
  console.log(indent + msg);
}

function log(array, level = 0) {
  for (let index = 0; index < array.length; index += 1) {
    const element = array[index];
    myLog(`😍普查 ==> [用户 ${element.name}]`, level);
    // 递归条件 无递归条件一定会陷入死循环
    if (element.children && element.children.length) {
      // myLog(`✅哇塞 ==> [用户 ${element.name}] 竟然还有儿孙满堂。我还要仔细查查搜搜！！！`, level);
      log(element.children, level + 1);
    } else {
      // myLog(`❌原来 ==> [用户 ${element.name}] 竟然是孤寡老人。那我走了，我要去差下一家了`, level);
    }
  }
}
//

// log(toRaw(permissionStore.asyncMenus));
</script>

<style lang="scss" scoped>
section{
  display: flex;

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
