/* eslint-disable no-underscore-dangle */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-alert */
// http://vue.ruoyi.vip/prod-api/captchaImage

import { getToken } from '../cookies';

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

function getErrMsgByNativeStatus(status) {
  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = '错误的请求';
      break;
    case 401:
      errMessage = '登录状态过期，请重新登录';
      break;
    case 403:
      errMessage = '禁止访问';
      break;
    case 404:
      errMessage = '网络请求错误,未找到该资源!';
      break;
    case 405:
      errMessage = '网络请求错误,请求方法未允许!';
      break;
    case 408:
      errMessage = '网络请求超时!';
      break;
    case 500:
      errMessage = '服务器错误,请联系管理员!';
      break;
    case 501:
      errMessage = '网络未实现!';
      break;
    case 502:
      errMessage = '网络错误!';
      break;
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!';
      break;
    case 504:
      errMessage = '网络超时!';
      break;
    case 505:
      errMessage = 'http版本不支持该请求!';
      break;
    default:
      errMessage = '未知错误';
  }
  return errMessage;
}

function getErrMsgByCode(code) {
  let errMessage = '';
  switch (code) {
    case 401:
      // 没有token
      errMessage = '认证失败，无法访问系统资源';
      break;
    case 403:
      errMessage = '当前操作没有权限';
      break;
    case 404:
      errMessage = '访问资源不存在';
      break;
    default:
      errMessage = '系统未知错误，请反馈给管理员';
  }
  return errMessage;
}

/**
 * @param {{url:string;method:string;}} options
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
          // 设置token
          Authorization: `Bearer ${getToken()}`,
          ...headers,
        };

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
