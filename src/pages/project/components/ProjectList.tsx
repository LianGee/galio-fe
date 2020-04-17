import React, { Component } from 'react';
import { Avatar, Card, Descriptions, List, message, Typography } from 'antd';
import { DeleteOutlined, FormOutlined, HomeOutlined } from '@ant-design/icons/lib';
import ProjectForm from '@/pages/project/components/ProjectForm';
import { list, save } from '@/services/project';

interface ProjectListProps {

}

interface ProjectListState {
  visible: boolean;
  data: any;
  initialValues: any;
}

const { Paragraph } = Typography;

class ProjectList extends Component<ProjectListProps, ProjectListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      initialValues: {
        type: 0,
        base_image: 'nginx',
      },
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    list().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data.concat({}),
          visible: false,
          initialValues: {
            type: 0,
            base_image: 'nginx',
          },
        });
      } else {
        message.error(response.msg);
      }
    });
  };

  addProject = () => {
    this.setState({
      visible: true,
      initialValues: {
        type: 0,
        base_image: 'nginx',
      },
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = (values: any) => {
    save(values).then(response => {
      if (response.status === 0) {
        message.success('保存成功');
        this.init();
      } else {
        message.error(response.msg);
      }
    });
  };

  editProject = (project: any) => {
    this.setState({ visible: true, initialValues: project });
  };

  render() {
    return <>
      <List
        grid={{ gutter: 24, column: 3 }}
        dataSource={this.state.data}
        rowKey="id"
        renderItem={(item: any) => (
          <List.Item>
            {
              item.id ?
                <Card
                  actions={[
                    <DeleteOutlined/>,
                    <FormOutlined onClick={() => this.editProject(item)}/>,
                    <HomeOutlined onClick={() => {
                      window.open(`http://${item.domain}`);
                    }}/>,
                  ]}
                  hoverable
                >
                  <Card.Meta
                    title={item.name}
                    avatar={
                      <Avatar src={item.logo} size={60}/>
                    }
                    description={item.description}
                  />
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="owner">
                      {item.user_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="端口">
                      {item.port}
                    </Descriptions.Item>
                    <Descriptions.Item label="类型">
                      {item.type === 0 ? '前端' : '后端'}
                    </Descriptions.Item>
                    <Descriptions.Item label="git">
                      <div style={{ width: 180 }}>
                        <Paragraph
                          copyable
                          ellipsis={{
                            rows: 1,
                          }}
                        >
                          {item.git}
                        </Paragraph>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
                :
                <Card
                  hoverable
                  onClick={this.addProject}
                >
                  新建项目
                </Card>
            }

          </List.Item>
        )}
      />
      <ProjectForm
        visible={this.state.visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
        initialValues={this.state.initialValues}
      />
    </>;
  }
}

export default ProjectList;
