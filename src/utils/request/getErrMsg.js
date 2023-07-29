import { useUserStore } from '@/store/modules/user';
import router from '@/router';

export function getErrMsgByNativeStatus(status) {
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

export function getErrMsgByCode(code) {
  let errMessage = '';
  const u = useUserStore();
  switch (code) {
    case 401:
      // 登录状态过期，请重新登录
      errMessage = '登录状态过期，请重新登录';
      u.logout().then(() => {
        router.replace('/login');
      });
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
