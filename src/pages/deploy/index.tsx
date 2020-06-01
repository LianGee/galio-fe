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

  selectProject = (value: any) => {
    if (value !== undefined) {
      this.getPodStatus(value);
    }
  };

  getPodStatus = (project_id: any) => {
    const { interval } = this.state;
    listContainerStatus(project_id).then(response => {
      if (response.status === 0) {
        let status = true;
        for (let i = 0; i < response.data.length; i += 1) {
          const { events } = response.data[i];
          console.log(events);
          if (events !== null) {
            for (let j = 0; j < events.length; j += 1) {
              if (events[j].type !== 'Normal' ||
                events[j].reason === 'Killing') {
                status = false;
                break;
              }
            }
          }
        }
        this.setState({
          podStatuses: response.data,
          podLoading: !status,
        });
        setTimeout(() => {
          if (status) {
            clearInterval(interval);
          }
        }, 2000);
      }
    });
  };

  deploy = (values: any) => {
    this.setState({
      loading: true,
      podLoading: true,
    });
    deploy(values).then(response => {
      if (response.status === 0) {
        this.setState({
          loading: false,
          interval: setInterval(() => {
            this.getPodStatus(values.project_id);
          }, 2000),
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
