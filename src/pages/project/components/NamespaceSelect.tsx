import React, { Component } from 'react';
import { Select } from 'antd';
import { listNamespace } from '@/services/k8s';

interface NamespaceSelectProps {
  value?: any;
  onChange?: any;
}

interface NamespaceSelectState {
  data: any;
}

const { Option } = Select;

class NamespaceSelect extends Component<NamespaceSelectProps, NamespaceSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listNamespace().then((response: any) => {
      this.setState({
        data: response.data,
      });
    });
  }

  render() {
    return <Select defaultValue={this.props.value}>
      {
        this.state.data.map((namespace: any) => (
          <Option value={namespace.name} key={namespace.name}>{namespace.name}</Option>
        ))
      }
    </Select>;
  }
}

export default NamespaceSelect;
