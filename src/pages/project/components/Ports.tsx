import React, { Component } from 'react';
import { Table, Select, Input } from 'antd';

interface PortsProps {
  value?: any;
  onChange?: any;
  serviceType: any;
}

interface PortsState {
}

const { Option } = Select;

class Ports extends Component<PortsProps, PortsState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  renderProto = () => {
    return <Select defaultValue="tcp">
      <Option value="tcp">TCP</Option>
      <Option value="udp">UDP</Option>
    </Select>;
  };

  render() {
    const columns_node_port = [
      {
        title: '协议',
        render: this.renderProto,
      },
      {
        title: '主机端口',
        render: () => <Input/>,
      },
      {
        title: '服务端口',
        render: () => <Input/>,
      },
    ];
    const columns_other = [
      {
        title: '协议',
        render: this.renderProto,
      },
      {
        title: '服务端口',
        render: () => <Input/>,
      },
    ];
    const data = [
      {
        id: 0,
      },
    ];
    return <Table
      size="small"
      columns={this.props.serviceType === 1 ? columns_node_port : columns_other}
      dataSource={data}
      rowKey="id"
      pagination={false}
    />;
  }
}

export default Ports;
