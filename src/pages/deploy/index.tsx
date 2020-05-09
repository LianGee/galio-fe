import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';
import PodList from '@/pages/deploy/components/PodList';
import { deploy, listContainerStatus } from '@/services/deploy';

interface DeployProps {

}

interface DeployState {
  podStatuses: any;
  loading: boolean;
  interval: any;
  podLoading: boolean;
}

class Deploy extends Component<DeployProps, DeployState> {
  constructor(props: any) {
    super(props);
    this.state = {
      podStatuses: [],
      loading: false,
      interval: undefined,
      podLoading: false,
    };
  }

  componentDidMount(): void {
    this.getPodStatus(undefined);
  }

  selectProject = (value: any) => {
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
    }
    if (value) {
      this.getPodStatus(value);
      // this.setState({
      //   interval: setInterval(() => {
      //     this.getPodStatus(value);
      //   }, 500),
      // });
    }
  };

  getPodStatus = (value: any) => {
    this.setState({ podLoading: true });
    listContainerStatus(value).then(response => {
      if (response.status === 0) {
        this.setState({
          podStatuses: response.data,
          podLoading: false,
        });
      }
    }).catch(() => {
    });
  };

  deploy = (values: any) => {
    this.setState({
      loading: true,
    });
    deploy(values).then(response => {
      if (response.status === 0) {
        this.setState({
          loading: false,
        });
      }
    });
  };

  render() {
    return <PageHeaderWrapper title={false}>
      <DeployForm
        selectProject={this.selectProject}
        loading={this.state.loading}
        deploy={this.deploy}
      />
      <PodList podStatuses={this.state.podStatuses} loading={this.state.podLoading}/>
    </PageHeaderWrapper>;
  }
}

export default Deploy;
