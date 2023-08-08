<template>
  <div class="color-list">
    <div
      class="color-item"
      v-for="color in colors"
      :key="color.text"
      :style="{background:color.text}"
    >
      {{ color.text }}
    </div>
  </div>
</template>

<script setup>
import Sortable from 'sortablejs';

const colors = ref([
  {
    text: 'Aquamarine',
  },
  {
    text: 'Hotpink',
  },
  {
    text: 'Gold',
  },
  {
    text: 'Crimson',
  },
  {
    text: 'Blueviolet',
  },
  {
    text: 'Lightblue',
  },
  {
    text: 'Cornflowerblue',
  },
  {
    text: 'Skyblue',
  },
  {
    text: 'Burlywood',
  },
]);

onMounted(() => {
  const el = document.querySelector('.color-list');
  // eslint-disable-next-line no-new
  new Sortable(el, {
    sort: true,
    ghostClass: 'sortable-ghost',
    onEnd: (e) => {
      const dragItem = colors.value.splice(e.oldIndex, 1)[0];
      colors.value.splice(e.newIndex, 0, dragItem);
    },
  });
});
</script>

<style>

.playground {
  position: relative;
  margin-top: 4rem;
}

.color-list {
  width: 100%;
  background: #efefef;
  overflow: hidden;

}
.color-item {
  background: #f5f5f5;
  /*padding: .5rem;*/
  /*color: #5f5f5f;*/
  float: left;
  width: 25%;
  height: 50px;
  border: 1px solid;
  display: block;
  padding-bottom: 0.3rem;
  /*transition: transform .3s;*/
}
.item_img{
  display: block;
  width: 5rem;
  height: 5rem;
}

.color-box.dragging {
  transform: scale(1.1);
}

.in-out-translate-fade-enter-active,
.in-out-translate-fade-leave-active {
  transition: all .5s;
}

.in-out-translate-fade-enter,
.in-out-translate-fade-leave-active {
  opacity: 0;
}

.in-out-translate-fade-enter {
  transform: translate3d(100%, 0, 0);
}

.in-out-translate-fade-leave-active {
  transform: translate3d(-100%, 0, 0);
}
/* 需要自定义拖拽图片的样式 */
.fn-hide{display: none;}
.vue_dnd_img {
  position: absolute;
  width: 5rem;
  height: 5rem;
  z-index: 100;
  box-shadow: 0 0 0.3rem 5px #3B5999;
  border-radius: 5px;
}
</style>
