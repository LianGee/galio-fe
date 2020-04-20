import React, { Component } from 'react';
import { Table } from 'antd';
import * as moment from 'moment';
import { listReplicaSet } from '@/services/k8s';

interface ReplicaSetProps {

}

interface ReplicaSetState {
  data: any;
}

class ReplicaSet extends Component<ReplicaSetProps, ReplicaSetState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listReplicaSet().then(response => {
      if (response.status === 0) {
        this.setState({ data: response.data });
      }
    });
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
      { title: 'Namespace', dataIndex: 'namespace', keyIndex: 'namespace' },
      {
        title: 'Pods',
        dataIndex: 'pods',
        keyIndex: 'pods',
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

export default ReplicaSet;
