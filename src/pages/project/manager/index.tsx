import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProjectList from '@/pages/project/components/ProjectList';
import { Button, Col, Input, message, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons/lib';
import { list, save } from '@/services/project';
import ProjectForm from '@/pages/project/components/ProjectForm';


interface ProjectProps {

}

interface ProjectState {
  data: any;
  loading: boolean;
  visible: boolean;
  initialValues: {};
  title: string;
}

const { Search } = Input;
const initialValues = {
  namespace: 'default',
  type: 0,
  base_image: 'nginx',
  dockerfile_type: 1,
  nginx_proxies: [
    { rule: '^api', server: '' },
  ],
  service_type: 0,
};

class Project extends Component<ProjectProps, ProjectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      visible: false,
      initialValues,
      title: '新建项目',
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    this.setState({ loading: true });
    list().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
          loading: false,
        });
      } else {
        message.error(response.msg);
      }
    });
  };

  onOk = (values: any) => {
    save(values).then(response => {
      if (response.status === 0) {
        message.success('保存成功');
        this.setState({
          visible: false,
        });
        this.init();
      } else {
        message.error(response.msg);
      }
    });
  };

  editProject = (project: any) => {
    this.setState({ visible: true, initialValues: project, title: '修改项目' });
  };

  addProject = () => {
    this.setState({
      visible: true,
      title: '新建项目',
      initialValues,
    });
  };

  onSearch = (value: string) => {
    const { data } = this.state;
    const d = data.filter((item: any) => item.name.indexOf(value) >= 0);
    this.setState({
      data: d,
    });
  };

  render() {
    return <PageHeaderWrapper>
      <Row style={{ marginBottom: 20 }}>
        <Col span={9} offset={14}>
          <Search
            enterButton="搜索"
            onSearch={this.onSearch}
          />
        </Col>
        <Col span={1}>
          <Button
            icon={<PlusCircleOutlined/>}
            type="primary"
            onClick={this.addProject}
          />
        </Col>
      </Row>
      <ProjectList
        data={this.state.data}
        loading={this.state.loading}
        editProject={this.editProject}
      />
      <ProjectForm
        visible={this.state.visible}
        onCancel={() => this.setState({ visible: false })}
        onOk={this.onOk}
        initialValues={this.state.initialValues}
        title={this.state.title}
      />
    </PageHeaderWrapper>;
  }
}

export default Project;
