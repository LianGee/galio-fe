import request from '@/utils/request';

export async function deploy(params: any) {
  return request('/api/deploy/start', {
    method: 'post',
    data: params,
  });
}
