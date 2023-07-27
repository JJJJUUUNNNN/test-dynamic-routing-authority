import { wjjRequest } from '@/utils/request';

export function login() {
  wjjRequest({
    url: 'http://vue.ruoyi.vip/prod-api/captchaImage',
    method: 'get',
  });
}
