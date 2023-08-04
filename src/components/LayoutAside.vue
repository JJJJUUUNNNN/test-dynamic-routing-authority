<template>
  <ul class="aside">
    <li v-for="item in menu" :key="item.path">
     <span>{{ item.name }}</span>
      <template v-if="item.children&&item.children.length">
        <LayoutAside :menu="item.children"></LayoutAside>
      </template >
    </li>
  </ul>
</template>

<script setup>
defineOptions({
  name: 'LayoutAside',
});

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.aside {
  width: 200px;
  border-right: 1px solid;
}
</style>
