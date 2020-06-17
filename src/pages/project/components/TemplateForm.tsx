import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { TEMPLATE_TYPES } from '@/constants/template';
import TemplateEditor from '@/pages/project/components/TemplateEditor';

interface TemplateFormProps {
  template: any;
  form: any;
}

interface TemplateFormState {
  mode: any;
}

const { Option } = Select;

class TemplateForm extends Component<TemplateFormProps, TemplateFormState> {
  constructor(props: any) {
    super(props);
    const mode = props.template && props.template.type ?
      TEMPLATE_TYPES[props.template.type].mode : TEMPLATE_TYPES[0].mode;
    this.state = {
      mode,
    };
  }

  componentDidMount(): void {
  }

  onChange = (value: any) => {
    this.setState({
      mode: TEMPLATE_TYPES[value].mode,
    });
  };

  render() {
    return <Form
      ref={this.props.form}
      initialValues={this.props.template}
    >
      <Form.Item label="id" name='id' style={{ display: 'none' }}>
        <Input/>
      </Form.Item>
      <Form.Item label="名称" name='name' required>
        <Input/>
      </Form.Item>
      <Form.Item label="类型" name='type' required>
        <Select onChange={this.onChange}>
          {
            TEMPLATE_TYPES.map((item: any) =>
              <Option value={item.value} key={item.value}>{item.name}</Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item
        label="描述"
        name="description"
        required
      >
        <Input/>
      </Form.Item>
      <Form.Item label="内容" name="content" required>
        <TemplateEditor mode={this.state.mode}/>
      </Form.Item>
    </Form>;
  }
}

export default TemplateForm;
