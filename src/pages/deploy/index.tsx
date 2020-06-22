import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';
import PodList from '@/pages/deploy/components/PodList';
import { deploy } from '@/services/deploy';
import { Avatar, Badge, Card, Col, Result, Row } from 'antd';
import { queryProjectById } from '@/services/project';
import { SmileOutlined, TagOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { get_pods_info, get_replica_info } from '@/pages/deploy/DeployUtil';
import DeployStatus from '@/pages/deploy/components/DeployStatus';
import { getPageQuery } from '@/utils/utils';

interface DeployProps {

}

interface DeployState {
  pods: any;
  replica: any;
  events: any;
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
      events: [],
      loading: false,
      currentProject: undefined,
    };
  }

  componentDidMount(): void {
    socket.connect();
    const { project_id } = getPageQuery();
    if (project_id) {
      this.selectProject(project_id);
    }
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
      events: [],
    });
    socket.emit('pod', { project_id });
    socket.emit('replica', { project_id });
    socket.emit('event', { project_id });
    socket.on('pod', (data: any) => {
      this.setState({ pods: get_pods_info(data) });
    });
    socket.on('replica', (data: any) => {
      this.setState({ replica: get_replica_info(data) });
    });
    socket.on('event', (data: any) => {
      const { events } = this.state;
      events.push(data);
      this.setState({ events });
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
    const { project_id } = getPageQuery();
    return <PageHeaderWrapper>
      <Card>
        <Row
          gutter={[16, 16]}
          justify="space-between"
        >
          <Col span={this.state.events.length > 0 ? 14 : 2} style={{ textAlign: 'center' }}>
            <DeployStatus
              replica={this.state.replica}
              events={this.state.events}
            />
          </Col>
          <Col span={this.state.events.length > 0 ? 10 : 22}>
            <DeployForm
              selectProject={this.selectProject}
              loading={this.state.loading}
              deploy={this.deploy}
              initialValues={{
                project_id: Number(project_id),
              }}
            />
          </Col>
        </Row>
        {
          this.state.currentProject ?
            <Card
              title={<>
                <Avatar src={this.state.currentProject.logo}/>
                <strong style={{ marginLeft: 10 }}>{this.state.currentProject.name}</strong>
              </>}
              extra={<div>
              <span style={{ marginRight: 8 }}>
                <TagOutlined style={{ color: '#108ee9' }}/> {this.state.replica.image}
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
      </Card>
    </PageHeaderWrapper>;
  }
}

export default Deploy;
