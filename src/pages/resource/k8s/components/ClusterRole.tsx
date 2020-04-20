import React, { Component } from 'react';
import { Table } from 'antd';
import { listClusterRole } from '@/services/k8s';
import * as moment from 'moment';

interface ClusterRoleProps {

}

interface ClusterRoleState {
  data: any;
}

class ClusterRole extends Component<ClusterRoleProps, ClusterRoleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listClusterRole().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
        });
      }
    });
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
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

export default ClusterRole;
