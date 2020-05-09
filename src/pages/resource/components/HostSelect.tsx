import { Select } from 'antd';
import React, { Component } from 'react';
import { listHost } from '@/services/host';

const { Option } = Select;

interface HostSelectProps {
  value?: any;
  onChange?: any;
}

interface HostSelectState {
  data: any;
}

class HostSelect extends Component<HostSelectProps, HostSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listHost().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
        });
      }
    });
  }

  render() {
    return <Select
      defaultValue={this.props.value}
      onChange={this.props.onChange}
      allowClear
    >
      {
        this.state.data.map((host: any) => (
          <Option value={host.id} key={host.id}>{host.name}({host.public_ip})</Option>
        ))
      }
    </Select>;
  }
}

export default HostSelect;
