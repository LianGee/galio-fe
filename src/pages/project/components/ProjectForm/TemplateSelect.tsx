import { Select } from 'antd';
import React, { Component } from 'react';
import { getTemplates } from '@/services/templates';

const { Option } = Select;

interface TemplateSelectProps {
  type: any;
  value?: any;
  onChange?: any;
}

interface TemplateSelectState {
  data: any;
}

class TemplateSelect extends Component<TemplateSelectProps, TemplateSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    getTemplates(this.props.type).then(response => {
      this.setState({
        data: response.data,
      });
    });
  }

  render() {
    return <Select
      defaultValue={this.props.value}
      onChange={(value: any) => this.props.onChange(value === undefined ? null : value)}
      allowClear
      showSearch
      filterOption={(input: any, option: any) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {
        this.state.data.map((template: any) => (
          <Option value={template.id} key={template.id}>{template.name}</Option>
        ))
      }
    </Select>;
  }
}

export default TemplateSelect;
