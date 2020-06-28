import React, { Component } from 'react';
import { Avatar, Card, Descriptions, List, Typography } from 'antd';
import { CiCircleOutlined, DeleteOutlined, FormOutlined, HomeOutlined, RocketOutlined } from '@ant-design/icons';

interface ProjectListProps {
  data: any;
  loading: boolean;
  editProject: any;
}

interface ProjectListState {
}

const { Paragraph } = Typography;

class ProjectList extends Component<ProjectListProps, ProjectListState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
  }

  render() {
    return <>
      <List
        loading={this.props.loading}
        grid={{ gutter: 24, column: 3 }}
        dataSource={this.props.data}
        rowKey="id"
        renderItem={(item: any) => (
          <List.Item>
            <Card
              actions={[
                <DeleteOutlined/>,
                <FormOutlined onClick={() => this.props.editProject(item)}/>,
                <CiCircleOutlined
                  onClick={() => {
                    window.location.href = `/build/create?project_id=${item.id}`;
                  }}
                />,
                <RocketOutlined
                  onClick={() => {
                    window.location.href = `/deploy/image?project_id=${item.id}`;
                  }}
                />,
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
              <Descriptions column={1} bordered size="small" style={{ marginTop: 20 }}>
                <Descriptions.Item label="owner">
                  {item.user_name}
                </Descriptions.Item>
                <Descriptions.Item label="端口">
                  {item.port}
                </Descriptions.Item>
                <Descriptions.Item label="类型">
                  {item.type === 0 ? '前端' : '后端'}
                </Descriptions.Item>
                <Descriptions.Item label="内部域名">
                  <div style={{ width: 160 }}>
                    <Paragraph
                      copyable
                      ellipsis={{
                        rows: 1,
                      }}
                    >
                      {item.service_domain}
                    </Paragraph>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </List.Item>
        )}
      />
    </>;
  }
}

export default ProjectList;
