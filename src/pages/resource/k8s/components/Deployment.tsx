import React, { Component } from 'react';
import { Table } from 'antd';
import * as moment from 'moment';
import { listDeployment } from '@/services/k8s';
import ReactJson from 'react-json-view';

interface DeploymentProps {

}

interface DeploymentState {
  data: any;
}

class Deployment extends Component<DeploymentProps, DeploymentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listDeployment().then(response => {
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
        title: 'container',
        dataIndex: 'container',
        keyIndex: 'container',
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

export default Deployment;
