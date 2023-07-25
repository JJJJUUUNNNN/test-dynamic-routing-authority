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
  const { url, method, onSuccess } = options;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log('原始', xhr.response);
        try {
          const { response } = xhr;
          onSuccess(response);
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        console.log('state=', xhr.status);
      }
    } else {
      // console.log(xhr.readyState);
    }
  };

  xhr.open(method, url);
  xhr.responseType = 'json';
  xhr.send();

  // 由于此方法是同步的，所以直接return response是获取不到的，需要使用个回调函数，来把response丢出去
  // return response;
}

// 根据视频链接获取视频长度
export function getVideoDuration(url, cb) {
  const video = document.createElement('video');
  video.src = url;

  video.onloadedmetadata = () => {
    console.log('video', video.duration);
    cb && cb(video.duration);
  };
}
