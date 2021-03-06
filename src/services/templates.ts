import request from '@/utils/request';

export async function getTemplates(type: any) {
  if (type === null) {
    return request(`/api/template/list`);
  }
  return request(`/api/template/list?type=${type}`);
}


export async function getTemplateById(id: any) {
  return request(`/api/template/get?id=${id}`);
}

export async function saveTemplate(template: any) {
  return request('/api/template/save', {
    method: 'post',
    data: template,
  });
}

export async function deleteTemplate(id: any) {
  return request(`/api/template/delete?template_id=${id}`, {
    method: 'delete',
  });
}

export async function preview(params: any) {
  return request('/api/template/preview', {
    method: 'post',
    data: params,
  });
}
