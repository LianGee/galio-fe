import request from '@/utils/request';

export async function listNamespace() {
  return request('/api/k8s/list/namespace');
}

export async function listService() {
  return request('/api/k8s/list/service');
}
