import request from '@/utils/request';

export async function listImage() {
  return request('/api/docker/list/image');
}
