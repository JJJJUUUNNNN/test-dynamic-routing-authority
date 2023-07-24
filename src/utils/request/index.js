// http://vue.ruoyi.vip/prod-api/captchaImage

// 使用 XMLHttpRequest 封装一个简单的请求
// 区分原生状态码和自定义状态码:
/**
 * 原生状态码是浏览器发送请求时返回的状态码 xhr.state
 * 自定义状态码是服务器返回的自定义状态码  xhr.readyState
 */
/**
 *
 * @param {{url:string;method:string;onSuccess:Function}} options
 * @returns
 */
export function wjjRequest(options) {
  const { url } = options;
  const { method } = options;
  const { onSuccess } = options;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    //
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('原始', xhr.response);
        try {
          onSuccess(xhr.response);
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        console.log('state=', xhr.status);
      }
    } else {
      console.log(xhr.readyState);
    }
  };

  xhr.open(method, url);
  xhr.responseType = 'json';
  xhr.send();
}

function zdd(callback) {
  const a = '1233';
  callback(a);
}

zdd((a) => {
  console.log('a', a);
});
