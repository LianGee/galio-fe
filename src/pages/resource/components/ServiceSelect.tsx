import { Select } from 'antd';
import React, { Component } from 'react';
import { listService } from '@/services/k8s';

const { Option } = Select;

interface ServiceSelectProps {
  value?: any;
  onChange?: any;
}

interface ServiceSelectState {
  data: any;
}

class ServiceSelect extends Component<ServiceSelectProps, ServiceSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    listService().then(response => {
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
        this.state.data.map((service: any) => {
          return service.ports.map((port: any) => (
            <Option
              value={`${service.name}.${service.namespace}:${port.port}`}
              key={`${service.name}.${service.namespace}:${port.port}(${port.protocol})`}>
              {`${service.name}.${service.namespace}:${port.port}(${port.protocol})`}
            </Option>
          ));
        })
      }
    </Select>;
  }
}

export default ServiceSelect;
