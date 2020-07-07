import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';

interface PodListProps {
  pods: any;
  deletePod: any;
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
          return <Tag color={value.color}>
            {value.text}
          </Tag>;
        },
      },
      {
        title: '启动时间',
        dataIndex: 'startTime',
        keyIndex: 'startTime',
      },
      {
        title: '操作',
        width: 150,
        render: (record: any) => <div>
          <Button
            size="small"
            onClick={() => this.props.deletePod(record)}
          >重启</Button>
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
