import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';
import PodList from '@/pages/deploy/components/PodList';
import { listContainerStatus } from '@/services/deploy';

interface DeployProps {

}

interface DeployState {
  containerStatus: any
}

class Deploy extends Component<DeployProps, DeployState> {
  constructor(props: any) {
    super(props);
    this.state = {
      containerStatus: [],
    };
  }

  selectProject = (value: any) => {
    listContainerStatus(value).then(response => {
      if (response.status === 0) {
        this.setState({
          containerStatus: response.data,
        });
      }
    });
  };

  render() {
    return <PageHeaderWrapper title={false}>
      <DeployForm selectProject={this.selectProject}/>
      <PodList containerStatus={this.state.containerStatus}/>
    </PageHeaderWrapper>;
  }
}

export default Deploy;
