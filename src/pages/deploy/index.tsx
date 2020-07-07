import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';
import PodList from '@/pages/deploy/components/PodList';
import { deletePod, deploy } from '@/services/deploy';
import { Avatar, Card, Col, message, Result, Row } from 'antd';
import { SelectOutlined, SmileOutlined, TagOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { get_pods_info, get_replica_info } from '@/pages/deploy/DeployUtil';
import DeployStatus from '@/pages/deploy/components/DeployStatus';
import { getPageQuery } from '@/utils/utils';
import { queryProjectById } from '@/services/project';

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
      currentProject: {},
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

  selectProject = (id: any) => {
    queryProjectById(id).then(response => {
      this.setState({
        currentProject: response.data,
      });
    });
    this.updateStatus(id);
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

  deletePod = (record: any) => {
    deletePod({
      name: record.name,
      namespace: record.namespace,
    }).then(response => {
      if (response.data) {
        message.success('重启成功');
        this.updateStatus(this.state.currentProject.id);
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
                project_id: project_id ? Number(project_id) : undefined,
              }}
              project={this.state.currentProject}
            />
          </Col>
        </Row>
        {
          this.state.currentProject.id ?
            <Card
              title={<>
                <Avatar src={this.state.currentProject.logo}/>
                <strong style={{ marginLeft: 10 }}>{this.state.currentProject.name}</strong>
                <SelectOutlined
                  style={{ marginLeft: 10, color: '#1890ff' }}
                  onClick={() => window.open(`http://${this.state.currentProject.domain}`)}
                />
              </>}
              extra={
                <div>
                  <span style={{ marginRight: 8 }}>
                    <TagOutlined style={{ color: '#108ee9' }}/> {this.state.replica.image}
                  </span>
                </div>
              }
            >
              <PodList
                pods={this.state.pods}
                deletePod={this.deletePod}
              />
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
