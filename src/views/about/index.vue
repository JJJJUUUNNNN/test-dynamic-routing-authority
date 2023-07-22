<template>
  <div>
    <Layout>
      <h1>关于页面</h1>

    难点：
    （5）使用 pinia 保存 是否获取过 动态菜单，定义 menus 数组存放

    （6）在路由拦截中获取动态菜单，根据 后台返回json（自行模拟后台请求） 和 项目文件路径获取，如果获取过则存放在menus中，获取过则不重复获取（根据menus的length判断）

    （7）退出登录按钮点击后清空所有动态路由和登录状态，并且返回到登录页面

    （8）默认路由只有登录注册

      export const router = createRouter({
        history: createWebHistory(),
        routes: [
          // 登录 注册（其余应该使用动态路由动态添加）
        ],
      });
    4. 提示 （1）3.（8）中的 routes 补充完整, 包含所有页面都，把登录和退出登录逻辑完成再考虑动态路由(今天至少完成) （2）3.（6）中的 后台返回json（自行模拟后台请求）参考,请思考是否需要包含404
    function getAsyncRoutes() {
          // return;
          return new Promise((resolve) => {
            resolve(
              [
                {
                  path: '/',
                  meta: {
                    title: '首页',
                  },
                  component: 'home/index.vue',
                },
                {
                  path: '/about',
                  meta: {
                    title: '关于',
                  },
                  component: 'about/index.vue',
                },
                {
                  path: '/account',
                  meta: {
                    title: '个人中心',
                  },
                  component: 'account/index.vue',
                },
              ],
            );
          });
        }
    </Layout>
  </div>
</template>

<script setup>
import Layout from '@/Layout/index.vue'

</script>

<style lang="scss" scoped>

</style>