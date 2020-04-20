import request from '@/utils/request';

export async function listClusterRole() {
  return request('/api/k8s/list/cluster/role');
}

export async function listNamespace() {
  return request('/api/k8s/list/namespace');
}

export async function listNode() {
  return request('/api/k8s/list/node');
}

export async function listPod() {
  return request('/api/k8s/list/pod');
}

export async function listReplicaSet() {
  return request('/api/k8s/list/replica/set');
}

export async function listDeployment() {
  return request('/api/k8s/list/deployment');
}

export async function listService() {
  return request('/api/k8s/list/service');
}
