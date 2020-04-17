import request from '@/utils/request';

export async function dBInstList() {
  return request('/api/db_inst/list');
}

export async function dbInstIpList() {
  return request('/api/db_inst/ip/list');
}

export async function getDatabase(id: any) {
  return request(`/api/db_inst/database/list?id=${id}`);
}

export async function getTablesInfo(id: any, database: any) {
  return request(`/api/db_inst/table/list?id=${id}&database=${database}`);
}


export async function query(params: any) {
  return request('/api/db_inst/query', {
    method: 'post',
    data: params,
  });
}
