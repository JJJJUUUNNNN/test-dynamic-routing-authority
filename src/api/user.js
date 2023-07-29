import { wjjRequest } from '@/utils/request';

export function getInfo() {
  return wjjRequest({
    url: '/getInfo',
    method: 'get',
    withoutToken: true,
  });
}
