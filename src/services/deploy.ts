import request from '@/utils/request';

export async function deploy(params: any) {
  return request('/api/deploy/start', {
    method: 'post',
    data: params,
  });
}

export async function listContainerStatus(project_id: any) {
  return request(`/api/deploy/read/namespaced/pod/status?project_id=${project_id}`);
}

export async function readLogOfPod(params: any) {
  return request('/api/deploy/log', {
    method: 'POST',
    data: params,
  });
}
