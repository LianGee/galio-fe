import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-nginx';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import { TEMPLATE_TYPES } from '@/constants/template';

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
        <AceEditor
          mode={this.state.mode}
          theme="monokai"
          name="editor"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Form>;
  }
}

export default TemplateForm;
