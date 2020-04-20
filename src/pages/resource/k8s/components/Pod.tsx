import React, { Component } from 'react';
import { Table } from 'antd';
import * as moment from 'moment';
import { listPod } from '@/services/k8s';

interface PodProps {

}

interface PodState {
  data: any;
}

class Pod extends Component<PodProps, PodState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listPod().then(response => {
      if (response.status === 0) {
        this.setState({ data: response.data });
      }
    });
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
      { title: 'Namespace', dataIndex: 'namespace', keyIndex: 'namespace' },
      { title: 'host_ip', dataIndex: 'host_ip', keyIndex: 'host_ip'},
      { title: 'pod_ip', dataIndex: 'pod_ip', keyIndex: 'pod_ip'},
      {
        title: '运行阶段',
        dataIndex: 'phase',
        keyIndex: 'phase',
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        keyIndex: 'created_at',
        render: (value: any) => <span>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    return <Table
      rowKey="uid"
      columns={columns}
      dataSource={this.state.data}
    />;
  }
}

export default Pod;
