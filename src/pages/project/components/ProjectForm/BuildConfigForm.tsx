import React, { Component } from 'react';
import { Form } from 'antd';
import BuildTypeSelect from '@/pages/project/components/ProjectForm/BuildTypeSelect';

interface BuildConfigFormProps {
  layout: any;
  initialValues: any;
  formRef: any;
}

interface BuildConfigFormState {

}

class BuildConfigForm extends Component<BuildConfigFormProps, BuildConfigFormState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <Form
      {...this.props.layout}
      initialValues={this.props.initialValues || {}}
      ref={this.props.formRef}
    >
      <Form.Item
        label="构建方式"
        name="build_type"
        rules={[{ required: true, message: '请选择构建方式' }]}
      >
        <BuildTypeSelect/>
      </Form.Item>
    </Form>;
  }
}

export default BuildConfigForm;
