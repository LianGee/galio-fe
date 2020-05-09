import request from '@/utils/request';

export async function listDomain() {
  return request('/api/domain/list/record');
}

export async function saveDomain(params: any) {
  return request('/api/domain/record/save', {
    method: 'post',
    data: params,
  });
}
