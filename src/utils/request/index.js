/* eslint-disable no-underscore-dangle */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-alert */
// http://vue.ruoyi.vip/prod-api/captchaImage

import { getToken } from '../cookies';
import { getErrMsgByCode, getErrMsgByNativeStatus } from './getErrMsg';
// 使用 XMLHttpRequest 封装一个简单的请求
// 区分原生状态码和自定义状态码:
/**
 * 原生状态码是浏览器发送请求时返回的状态码 xhr.state
 * 自定义状态码是服务器返回的自定义状态码  xhr.readyState
 */

const baseUrl = import.meta.env.VITE_APP_API_URL;
function getUrlParmamsStr(data) {
  if (!data || typeof data !== 'object') return '';
  const dataArr = [];
  if (data) {
    for (const key in data) {
      if (key) {
        dataArr.push(`${key}=${data[key]}`);
      }
    }
  }
  return dataArr.join('&');
}

function addBaseUrl(url) {
  let finalUrl = '';
  if (url.startsWith('http') || url.startsWith('https')) {
    finalUrl = url;
  } else {
    finalUrl = baseUrl + url;
  }
  return finalUrl;
}

/**
 * @param {{url:string;method:string;data?:Record<string,any>;params?:Record<string,any>;headers?:Record<string,any>;responseType?:string;withoutToken?:true}} options
 * @return {Promise<Object>}
 */
export function wjjRequest(options) {
  return new Promise((resolve, reject) => {
    const {
      method = 'get',
      data = {},
      params = {},
      headers = {},
      responseType = 'json',
      url = '',
      // 不带token ==》说明该程序 多少接口需要token 少数不需要 不需要token 再设置 withoutToken
      withoutToken = false,
    } = options;

    if (url) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          try {
            if (xhr.status === 200) {
              const { response } = xhr;
              // 自定义状态码 只有 200 才是正常的
              if (response.code === 200) {
                resolve(response);
              } else {
                const errMsg = getErrMsgByCode(response.code);

                if (response.msg) {
                  throw new Error(response.msg);
                } else {
                  throw new Error(errMsg);
                }
              }
            } else {
              const errMsg = getErrMsgByNativeStatus(xhr.status);

              throw new Error(errMsg);
            }
          } catch (error) {
            console.log(error);
            $push.error(error.message || '发生错误！');
            // alert((error || {}).message || '发生错误！');
            reject(error);
          }
        }
      };

      function open() {
        const _url = addBaseUrl(url);
        if (method === 'get') {
          xhr.open(method, `${_url}?${getUrlParmamsStr(params)}`);
        } else if (method === 'post') {
          xhr.open(method, _url);
        }
      }

      function setHeaders() {
        const defaultHeaders = {
          'Content-Type': 'application/json',
          ...headers,
        };

        // 设置token
        if (withoutToken === false) {
          defaultHeaders.Authorization = `Bearer ${getToken()}`;
        }

        for (const key in defaultHeaders) {
          if (key) {
            xhr.setRequestHeader(key, defaultHeaders[key]);
          }
        }
      }

      function setResponseType() {
        xhr.responseType = responseType;
      }

      function send() {
        if (method === 'get') {
          xhr.send();
        } else if (method === 'post') {
          xhr.send(JSON.stringify(data));
        }
      }

      open();

      setHeaders();

      setResponseType();

      send();
    } else {
      reject(new Error('url 不能为空'));
    }

  // 由于此方法是同步的，所以直接return response是获取不到的，需要使用个回调函数，来把response丢出去
  // return response;
  });
}

// 根据视频链接获取视频长度
// export function getVideoDuration(url) {
//   return new Promise((resolve, reject) => {
//     const video = document.createElement('video');
//     video.src = url;

//     video.onloadedmetadata = () => {
//       console.log('video', video.duration);
//       resolve(video.duration);
//     };

//     video.onerror = (error) => {
//       reject(error);
//     };
//   });
// }
