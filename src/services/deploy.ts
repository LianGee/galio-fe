import request from '@/utils/request';

export async function deploy(params: any) {
  return request('/api/deploy/start', {
    method: 'post',
    data: params,
  });
}

export async function deletePod(params: any) {
  return request('/api/deploy/delete/pod', {
    method: 'delete',
    data: params,
  });
}
