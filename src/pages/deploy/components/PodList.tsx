import React, { Component } from 'react';
import { Button, Table } from 'antd';

interface PodListProps {
  containerStatus: any;
}

interface PodListState {
  data: any;
}


class PodList extends Component<PodListProps, PodListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    this.setState({
      data: this.props.containerStatus,
    });
  }

  render() {
    const columns = [
      { title: 'pod', dataIndex: 'name', keyIndex: 'name' },
      { title: '宿主机', dataIndex: 'host_ip', keyIndex: 'host_ip' },
      { title: '容器ip', dataIndex: 'pod_ip', keyIndex: 'pod_ip' },
      { title: '状态', dataIndex: 'phase', keyIndex: 'phase' },
      {
        title: '原因',
        dataIndex: 'reason',
        keyIndex: 'reason',
        ellipsis: true,
      },
      { title: '启动时间', dataIndex: 'start_time', keyIndex: 'start_time' },
      { title: '重启', dataIndex: 'restart_count', keyIndex: 'restart_count' },
      {
        title: '操作',
        render: (record: any) => <div>
          <Button size="small">重启</Button>
          <Button size="small" style={{ marginLeft: 5 }}>日志</Button>
        </div>,
      },
    ];
    return <Table
      rowKey="uid"
      columns={columns}
      dataSource={this.props.containerStatus}
      pagination={false}
      size="small"
    />;
  }
}

export default PodList;
