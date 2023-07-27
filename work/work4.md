

homework4

7.26

# 一、进一步完善你的 `wjjRequest` 函数(基础)

1. 支持 `baseUrl` 例如 ruoyi 在线预览版本中，地址都是 `http://vue.ruoyi.vip/prod-api` 开头的，即 baseUrl。要求从 .env 设置 baseUrl，访问接口则自动拼接 baseUrl

.env.development 文件
``` conf
VITE_APP_API_URL = 'http://vue.ruoyi.vip/prod-api'
```
```js
// 基础
wjjRequest({
  url: "/login", // login  ===> http://vue.ruoyi.vip/prod-api/login
});

// 兼容处理 如果url 是个链接 则不拼接
wjjRequest({
  url: "https://www.baidu.com", // https://www.baidu.com  ===> https://www.baidu.com
});
```

2. 支持 `get` 和 `post` 参数

```js
// get 方法
wjjRequest({
  method: "get",
  params: {
    xxx: "xxx",
  },
});
// post 方法
wjjRequest({
  method: "post",
  data: {
    xxx: "xxx",
  },
});
```

3. 支持 `headers`

```js
// 例如 ruoyi headers 带 token
wjjRequest({
  // ...,
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});
```

4. 弹窗报错！
   请使用[这个插件](https://github.com/smastrom/notivue) 进行弹框报错，即当请求发送错误时，弹出错误信息！（包括原始状态码和系统状态码错误！）

5. 前三点无需注重请求结果也不需要考虑当前应用的逻辑（不用去写登录的点什么请求咯，或者拿个请求接口是多少，或者登录页面怎么了，或者token 是什么，getToken 怎么 写 ，完全可以写死了）！ 目的就是 `baseUrl`、 `参数` 和 `headers`正常工作，

# 二、完成登录逻辑(进阶 1)

1. 提取接口到`api/login.js`

| 接口地址      | 请求方法 | 是否需要登录凭证 token | 参数   | 备注         |
| ------------- | -------- | ---------------------- | ------ | ------------ |
| /captchaImage | get      | 否                     | 无     | 获取验证码   |
| /login        | get      | 否                     | 见下文 | 登录接口     |
| /getInfo      | get      | 是                     | 无     | 获取用户信息 |
| /getRouters   | get      | 是                     | 无     | 获取路由信息 |

2. 完成登录逻辑
   调用登录之后存储 `token` 根据 `token` 获取用户信息和路由信息 并重定向到 首页（token 使用 cookie 进行 存储）

   登录页面请完成一个 输入框 和 验证码 即可

   定义 uuid 和 code 的 ref；uuid 是获取 验证码的接口(/captchaImage)返回的，code 用于 input 的 v-model

   即 写死了 账号密码 只用手动输入验证码即可登录！！！

   注意路由拦截！！！

```js
wjjRequest({
  // ...,
  data: {
    username: "admin",
    password: "admin123",
    code: code.value,
    uuid: uuid.value,
  },
});
```

3. 注意 此时的 异步路由 （动态路由沿用当前逻辑），不用 router.addRoute getRouters 的路由！！！

# 三、使用`递归组件`完成侧边栏菜单！(进阶 2)

1. 侧边栏菜单组件不需要展开折叠子菜单功能，子菜单和父菜单有缩进区分即可。

2. LayoutAside 组件 可以分为多个组件或者一个，取决于你

3. 一定使用 `递归组件`! 递归组件可能需要使用组件命名，可以在 vue3.3 可以使用宏函数 [defineOptions](https://blog.vuejs.org/posts/vue-3-3#defineoptions) (无需引入)

```html
<script setup>
  defineOptions({
    name: "xxx",
  });
</script>
```

4. layout 组件修改为：

```html
<template>
  <div class="container">
    <NavHeader></NavHeader>
    <section>
      <!-- aside 组件 -->
      <LayoutAside />
      <main>
        <router-view></router-view>
      </main>
    </section>
    <footer height="30px">Copyright © wangjunjun</footer>
  </div>
</template>
```

# ⚠ 注意事项
1. `请仔细阅读本文档！！！！`
2. 必须`按要求`完成 `基础内容`
3. 接口相关的返回值请自行查看 `ruoyi 在线预览` 或 `ruoyi 源码`
4. `usePermissionStore` 中现有结构不变，添加 `asideMenus` 存放 getRouters 的菜单列表！

# 参考

1. [vue 递归组件](https://cn.vuejs.org/api/sfc-script-setup.html#using-components)
2. [vue 树形组件例子](https://cn.vuejs.org/examples/#tree)
3. [ruoyi 在线预览](http://vue.ruoyi.vip/index)
4. ruoyi 源码 请 ctrl+r 选择 ruoyi-ui 项目 (E\project\RuoYi-Vue)
