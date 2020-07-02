import request from '@/utils/request';

export async function save(params: any) {
  return request('/api/project/save', {
    method: 'POST',
    data: params,
  });
}

export async function saveDeployConfig(params: any) {
  return request('/api/project/save/deploy/config', {
    method: 'POST',
    data: params,
  });
}

export async function list() {
  return request('/api/project/list');
}

export async function queryProjectById(project_id: number) {
  return request(`/api/project/query?project_id=${project_id}`);
}
