export const TEMPLATE_TYPE = {
  DOCKERFILE: 0,
  NGINX: 1,
  K8S_DEPLOYMENT: 2,
  K8S_SERVICE: 3,
  K8S_INGRESS: 4,
};

export const TEMPLATE_TYPES = [
  {
    name: 'DOCKERFILE',
    color: '#0091e2',
    value: 0,
    mode: 'dockerfile',
  },
  {
    name: 'NGINX',
    color: '#009900',
    value: 1,
    mode: 'nginx',
  },
  {
    name: 'K8S_DEPLOYMENT',
    color: '#108ee9',
    value: 2,
    mode: 'yaml',
  },
  {
    name: 'K8S_SERVICE',
    color: '#108ee9',
    value: 3,
    mode: 'yaml',
  },
  {
    name: 'K8S_INGRESS',
    color: '#87d068',
    value: 4,
    mode: 'yaml',
  },
  {
    name: 'K8S_NAMESPACE',
    color: '#108ee9',
    value: 5,
    mode: 'yaml',
  },
];
