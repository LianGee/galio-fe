import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';
import PodList from '@/pages/deploy/components/PodList';
import { deploy } from '@/services/deploy';
import { Avatar, Badge, Card, Result } from 'antd';
import { queryProjectById } from '@/services/project';
import { SmileOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { get_pods_info, get_replica_info } from '@/pages/deploy/DeployUtil';

interface DeployProps {

}

interface DeployState {
  pods: any;
  replica: any;
  loading: boolean;
  currentProject: any;
}

const socket = io('http://127.0.0.1:8010/galio/deploy');

class Deploy extends Component<DeployProps, DeployState> {
  constructor(props: any) {
    super(props);
    this.state = {
      replica: {},
      pods: [],
      loading: false,
      currentProject: undefined,
    };
  }

  componentDidMount(): void {
    socket.connect();
  }

  componentWillUnmount(): void {
    socket.close();
  }

  selectProject = (value: any) => {
    queryProjectById(value).then(response => {
      this.setState({
        currentProject: response.data,
      });
    });
    this.updateStatus(value);
  };

  updateStatus = (project_id: any) => {
    this.setState({
      pods: [],
      replica: {},
    });
    socket.emit('pod', { project_id });
    socket.emit('replica', { project_id });
    socket.on('pod', (data: any) => {
      console.log(get_pods_info(data));
      this.setState({ pods: get_pods_info(data) });
    });
    socket.on('replica', (data: any) => {
      this.setState({ replica: get_replica_info(data) });
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
        defaultValues={{}}
      />
      {
        this.state.currentProject ?
          <Card
            title={<>
              <Avatar src={this.state.currentProject.logo}/>
              <strong style={{ marginLeft: 10 }}>{this.state.currentProject.name}</strong>
            </>}
            extra={<div>
              <span style={{ marginRight: 8 }}>
                当前镜像: {this.state.replica.image}
              </span>
              {
                this.state.replica.status ?
                  <Badge
                    status={
                      this.state.replica.status.replicas === this.state.replica.status.readyReplicas ?
                        'success' : 'error'
                    }
                    text={
                      <span>
                             {this.state.replica.status.readyReplicas}/{this.state.replica.status.replicas}
                        </span>
                    }
                  />
                  : null
              }
            </div>}
          >
            <PodList pods={this.state.pods}/>
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
