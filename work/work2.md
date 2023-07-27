# 思考

xhr.responseType = 'json';

有什么用？
responseType 还可以 设置为其他什么？ 分别有什么用？

1. responseType用于指定响应中包含的数据类型
2. 还可以设置为：
  - "text"  ---> response 是 DOMString 对象中的文本。
  - "" ---> 与默认类型 text相同
  - "arraybuffer" --->  response 是一个包含二进制数据的 JavaScript ArrayBuffer。
  - "blob" ---> response 是一个包含二进制数据的 Blob 对象。
  - "document"  --->  response 是一个 HTML Document 或 XML XMLDocument，根据接收到的数据的 MIME 类型而定。
  - "json"   --->  response 是通过将接收到的数据内容解析为 JSON 而创建的 JavaScript 对象。

**备注： 将 responseType 设置为特定值时，作者应确保服务器实际发送的响应与该格式兼容。如果服务器返回的数据与设置的 responseType 不兼容，则 response 的值将为null .*

# 任务

封装完成之后，在 login.vue 中 写一个图片 通过 【你写的请求】 调用 [获取验证码接口](http://vue.ruoyi.vip/prod-api/captchaImage) 获取 src，点击图片可以刷新 （接口为 ：； ）

   a.只需要图片其他类似输入框不需要，之前的登录按钮保存

   b.此接口返回的验证码 需要在 res.img 前面添加 data:image/gif;base64,

   ```js
   this.src = "data:image/gif;base64," + res.img;
   ```

c. 重要！！！ 如何获取请求成功后服务器返回的数据，
      请参考 [js回调函数](https://developer.mozilla.org/zh-CN/docs/Glossary/Callback_function)



# 进阶任务（优先完成基础任务！尤其对 xhr 理解 ，进阶任务现不做要求）

完成好上面的内容之后，请手写一个自己的的 promise 定义为 WjjPromise ,可以如下调用：

``` js

  new WjjPromise((resolve, reject) => {
      resolve()
      // 或者
      reject()
  });
```

可以网络搜索

重点，思考 promise 是什么？为什么会出现 promise
参考 [mdn Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)