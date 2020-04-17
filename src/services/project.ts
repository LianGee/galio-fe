import request from '@/utils/request';

export async function save(params: any) {
  return request('/api/project/save', {
    method: 'POST',
    data: params,
  });
}

export async function list() {
  return request('/api/project/list');
}
