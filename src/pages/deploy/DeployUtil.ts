export const get_replica_info = (replica: any) => {
  const container = replica.spec.template.spec.containers[0];
  return {
    image: container.image,
    env: container.env,
    status: replica.status,
  };
};

export const get_event_info = (event: any) => {
  return {
    name: event.involvedObject.name,
    reason: event.reason,
    type: event.type,
  };
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
      phase: pod.status.phase,
      restartCount: containerStatus.restartCount,
    });
  }
  return pods_info;
};
