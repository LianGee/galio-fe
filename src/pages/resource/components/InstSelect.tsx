import { Select } from 'antd';
import React, { Component } from 'react';
import { dbInstIpList } from '@/services/database';

const { Option } = Select;

interface TemplateSelectProps {
  value?: any;
  onChange?: any;
}

interface TemplateSelectState {
  data: any;
}

class InstSelect extends Component<TemplateSelectProps, TemplateSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    dbInstIpList().then(response => {
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
        this.state.data.map((inst: any) => (
          <Option value={inst.id} key={inst.id}>{inst.ip}({inst.user_name})</Option>
        ))
      }
    </Select>;
  }
}

export default InstSelect;
