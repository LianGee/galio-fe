import React, { Component } from 'react';
import { Table } from 'antd';
import * as moment from 'moment';
import { listNamespace } from '@/services/k8s';

interface NamespaceProps {

}

interface NamespaceState {
  data: any;
}

class Namespace extends Component<NamespaceProps, NamespaceState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listNamespace().then(response => {
      if (response.status === 0) {
        this.setState({ data: response.data });
      }
    });
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
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

export default Namespace;
