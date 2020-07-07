import { PodStatus } from '@/constants/deploy';

export const get_replica_info = (replica: any) => {
  const container = replica.spec.template.spec.containers[0];
  return {
    image: container.image,
    env: container.env,
    status: replica.status,
  };
};

const get_container_status = (containerStatus: any) => {
  const { state } = containerStatus;
  if (state === undefined) {
    return PodStatus.UNKNOWN;
  }
  const key = Object.keys(state)[0].toUpperCase();
  return PodStatus[key];
};

export const get_pods_info = (pods: any) => {
  const pods_info = [];
  for (let i = 0; i < pods.length; i += 1) {
    const pod = pods[i];
    const containerStatus = pod.status.containerStatuses ?
      pod.status.containerStatuses[0] : {};
    pods_info.push({
      uid: pod.metadata.uid,
      name: pod.metadata.name,
      namespace: pod.metadata.namespace,
      podIp: pod.status.podIP,
      hostIP: pod.status.hostIP,
      startTime: pod.status.startTime,
      phase: get_container_status(containerStatus),
      restartCount: containerStatus.restartCount,
    });
  }
  return pods_info;
};
