<template>
  <div>
    <h1>首页</h1>
    {{ name }}
    <input type="text" v-model="name" />
    {{ width }}
    {{ data }}
  </div>
</template>

<script >

/**
* 防抖函数
* @param {Function} func
* @param {number} wait
* @param {boolean} immediate
* @return {*}
*/
// function debounce(func, wait, immediate) {
//   let timeout; let args; let context; let timestamp; let
//     result;

//   const later = function () {
//   // 据上一次触发时间间隔
//     const last = +new Date() - timestamp;

//     // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
//     if (last < wait && last > 0) {
//       timeout = setTimeout(later, wait - last);
//     } else {
//       timeout = null;
//       // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//       if (!immediate) {
//         result = func.apply(context, args);
//         if (!timeout) {
//           context = args = null;
//         }
//       }
//     }
//   };

//   return function (...args) {
//     context = this;
//     timestamp = +new Date();
//     const callNow = immediate && !timeout;
//     // 如果延时不存在，重新设定延时
//     if (!timeout) timeout = setTimeout(later, wait);
//     if (callNow) {
//       result = func.apply(context, args);
//       context = args = null;
//     }

//     return result;
//   };
// }

export default {
  data() {
    return {
      name: 'wjj',
      width: 0,
      data: '',
    };
  },
  created() {
    this.getImg();
  },
  setup() {
    const current = getCurrentInstance();

    const child = {
      name: 'xiaowang',
      parent: {
        name: '5',
        parent: {
          name: '4代传人',
          parent: {
            name: '3代传人',
            parent: {
              name: 'e代传人',
              parent: {
                name: '一代传人',
              },
            },
          },
        },
      },
    };
    function findRoot(instance) {
      console.log('instance ==> ', instance);
      if (instance.parent) {
        return findRoot(instance.parent);
      }
      return instance;
    }
    console.log('aaaa', findRoot(child));

    onMounted(() => {
    });
  },
  methods: {
    getImg() {
      const img = document.createElement('img');
      img.src = '/bb.png';

      const that = this;
      img.onload = function () {
        console.log(this); // ===> img 而不是 vue实例
        that.width = img.width;
      };

      function wjjAjax({ success }) {
        success('aaa');
      }

      wjjAjax({
        success(res) {
          console.log(res);
          console.log('this', this);
          that.data = res;
        },
      });
      img.onerror = (e) => {

      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
