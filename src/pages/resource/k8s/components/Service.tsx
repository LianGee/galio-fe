import React, { Component } from 'react';
import { Table } from 'antd';
import * as moment from 'moment';
import { listService } from '@/services/k8s';
import ReactJson from 'react-json-view';

interface ServiceProps {

}

interface ServiceState {
  data: any;
}

class Service extends Component<ServiceProps, ServiceState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listService().then(response => {
      if (response.status === 0) {
        this.setState({ data: response.data });
      }
    });
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
      { title: 'Namespace', dataIndex: 'namespace', keyIndex: 'namespace' },
      { title: 'cluster_ip', dataIndex: 'cluster_ip', keyIndex: 'cluster_ip'},
      { title: 'external_ip', dataIndex: 'external_ip', keyIndex: 'external_ip'},
      {
        title: 'type',
        dataIndex: 'type',
        keyIndex: 'type',
      },
      {
        title: '端口',
        dataIndex: 'ports',
        keyIndex: 'ports',
        render: (value: any) => <ReactJson src={value}/>,
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

export default Service;
