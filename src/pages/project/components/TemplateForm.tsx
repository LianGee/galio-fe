import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-nginx';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

interface TemplateFormProps {
  template: any;
  form: any;
}

interface TemplateFormState {
  mode: any;
}

const { Option } = Select;
const modes = ['dockerfile', 'nginx', 'yaml'];
class TemplateForm extends Component<TemplateFormProps, TemplateFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: modes[this.props.template.type],
    };
  }

  componentDidMount(): void {
  }

  onChange = (value: any) => {
    this.setState({
      mode: modes[value],
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
          <Option value={0}>dockerfile</Option>
          <Option value={1}>nginx</Option>
          <Option value={2}>k8s</Option>
        </Select>
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
