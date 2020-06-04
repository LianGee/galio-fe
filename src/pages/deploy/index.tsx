import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';
import PodList from '@/pages/deploy/components/PodList';
import { deploy, listContainerStatus } from '@/services/deploy';
import { Avatar, Button, Card, Result } from 'antd';
import { queryProjectById } from '@/services/project';
import { SmileOutlined } from '@ant-design/icons';
import io from 'socket.io-client';

interface DeployProps {

}

interface DeployState {
  podStatuses: any;
  loading: boolean;
  interval: any;
  podLoading: boolean;
  currentProject: any;
}

const socket = io('http://127.0.0.1:8010/galio/deploy');

class Deploy extends Component<DeployProps, DeployState> {
  constructor(props: any) {
    super(props);
    this.state = {
      podStatuses: [],
      loading: false,
      interval: undefined,
      podLoading: false,
      currentProject: undefined,
    };
  }

  componentDidMount(): void {
    console.log('socket connect');
    socket.connect();
  }

  componentWillUnmount(): void {
    console.log('close socket');
    socket.close();
  }

  selectProject = (value: any) => {
    if (value !== undefined) {
      queryProjectById(value).then(response => {
        this.setState({
          currentProject: response.data,
        });
      });
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
          podLoading: false,
          interval: setInterval(() => {
            this.getPodStatus(values.project_id);
          }, 2000),
        });
      }
    });
  };

  test = () => {
    socket.emit('replica', { project_id: 1 });
    socket.emit('pod', { project_id: 1 });
    socket.emit('event', { project_id: 1 });
    socket.on('pod', (data: any) => {
      console.log(data);
    });
    socket.on('replica', (data: any) => {
      console.log(data);
    });
    socket.on('event', (data: any) => {
      console.log(data);
    });
  };

  render() {
    return <PageHeaderWrapper title={false}>
      <DeployForm
        selectProject={this.selectProject}
        loading={this.state.loading}
        deploy={this.deploy}
        defaultValues={{}}
      />
      <Button onClick={this.test}>test</Button>
      {
        this.state.currentProject ?
          <Card
            loading={this.state.podLoading}
            title={<>
              <Avatar src={this.state.currentProject.logo}/>
              <strong style={{ marginLeft: 10 }}>{this.state.currentProject.name}</strong>
            </>}
            extra={this.state.currentProject.name}
          >
            <PodList podStatuses={this.state.podStatuses}/>
          </Card> :
          <Card>
            <Result
              icon={<SmileOutlined/>}
              title="请选择一个项目"
            />
          </Card>
      }
    </PageHeaderWrapper>;
  }
}

export default Deploy;
