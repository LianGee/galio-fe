import request from '@/utils/request';

export async function listImage() {
  return request('/api/docker/list/image');
}

export async function listProjectImage(project_id: any) {
  return request(`/api/docker/list/project/image?project_id=${project_id}`)
}
