import request from '@/utils/request';

export async function getBranches() {
  return request('/api/build/branches');
}

export async function build(params: any) {
  return request('/api/build/project', {
    method: 'POST',
    data: params,
  });
}

export async function getBuildLog() {
  return request('/api/build/logs');
}

export async function getBuildLogContent(log_path: any) {
  return request(`/api/build/log/content?log_path=${log_path}`);
}
