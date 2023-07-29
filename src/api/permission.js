import { wjjRequest } from '@/utils/request';

export function getRouters() {
  return wjjRequest({
    url: '/getRouters',
    method: 'get',
  });
}
