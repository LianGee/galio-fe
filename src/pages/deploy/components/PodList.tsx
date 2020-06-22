import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';

interface PodListProps {
  pods: any;
}

interface PodListState {
}

class PodList extends Component<PodListProps, PodListState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
  }

  render() {
    const columns = [
      { title: 'pod', dataIndex: 'name', keyIndex: 'name' },
      { title: '宿主机', dataIndex: 'hostIP', keyIndex: 'hostIP' },
      { title: '容器ip', dataIndex: 'podIp', keyIndex: 'podIp' },
      {
        title: '状态',
        dataIndex: 'phase',
        keyIndex: 'phase',
        render: (value: any) => {
          // todo any other phase
          const colors = {
            'Pending': '#108ee9',
            'Running': '#87d068',
          };
          return <Tag color={colors[value]}>
            {value}
          </Tag>;
        },
      },
      {
        title: '启动时间',
        dataIndex: 'startTime',
        keyIndex: 'startTime',
      },
      { title: '重启', dataIndex: 'hostIP', keyIndex: 'hostIP' },
      {
        title: '操作',
        width: 150,
        render: (record: any) => <div>
          <Button size="small">重启</Button>
          <Button
            size="small"
            style={{ marginLeft: 5 }}
            onClick={() => {
              const redirect = `/log?name=${record.name}&namespace=${record.namespace}`;
              window.open(redirect);
            }}
          >日志</Button>
        </div>,
      },
    ];
    return <div>
      <Table
        rowKey="name"
        columns={columns}
        dataSource={this.props.pods}
        size="small"
        bordered
      />
    </div>;
  }
}

export default PodList;
