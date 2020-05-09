import request from '@/utils/request';

export async function listHost() {
  return request('/api/cloud_host/list');
}

export async function saveHost(params: any) {
  return request('/api/cloud_host/save', {
    method: 'post',
    data: params,
  });
}
