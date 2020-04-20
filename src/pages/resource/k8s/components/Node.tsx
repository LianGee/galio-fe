import React, { Component } from 'react';
import { Table } from 'antd';
import * as moment from 'moment';
import { listNode } from '@/services/k8s';

interface NodeProps {

}

interface NodeState {
  data: any;
}

class Node extends Component<NodeProps, NodeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listNode().then(response => {
      if (response.status === 0) {
        this.setState({ data: response.data });
      }
    });
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
      {
        title: '状态',
        dataIndex: 'status',
        keyIndex: 'status',
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

export default Node;
