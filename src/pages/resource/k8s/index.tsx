import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Collapse } from 'antd';
import ClusterRole from '@/pages/resource/k8s/components/ClusterRole';
import Namespace from '@/pages/resource/k8s/components/Namespace';
import Node from '@/pages/resource/k8s/components/Node';
import Pod from '@/pages/resource/k8s/components/Pod';
import ReplicaSet from '@/pages/resource/k8s/components/ReplicaSet';
import Deployment from '@/pages/resource/k8s/components/Deployment';

const {Panel} = Collapse;

class K8s extends Component {
  render() {
    return <PageHeaderWrapper title={false}>
      <Collapse defaultActiveKey={[2]} destroyInactivePanel>
        <Panel header="Cluster Roles" key={1}>
          <ClusterRole/>
        </Panel>
        <Panel header="Namespaces" key={2}>
          <Namespace/>
        </Panel>
        <Panel header="Nodes" key={3}>
          <Node/>
        </Panel>
        <Panel header="Pods" key={4}>
          <Pod/>
        </Panel>
        <Panel header="ReplicaSets" key={5}>
          <ReplicaSet/>
        </Panel>
        <Panel header="Deployments" key={6}>
          <Deployment/>
        </Panel>
      </Collapse>
    </PageHeaderWrapper>;
  }
}

export default K8s;
