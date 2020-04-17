import { Select } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

interface DBSelectProps {
  value?: any;
  onChange?: any;
  data: any;
}

interface DBSelectState {
}

class DBSelect extends Component<DBSelectProps, DBSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
  }

  render() {
    return <Select
      defaultValue={this.props.value}
      onChange={this.props.onChange}
      allowClear
    >
      {
        this.props.data.map((db: any) => (
          <Option value={db} key={db}>{db}</Option>
        ))
      }
    </Select>;
  }
}

export default DBSelect;
