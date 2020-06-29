import request from '@/utils/request';

export async function listBaseImage() {
  return request('/api/harbor/list/base/image')
}

export async function listProjectImage(project_id: any) {
  return request(`/api/harbor/list/project/image?project_id=${project_id}`)
}
