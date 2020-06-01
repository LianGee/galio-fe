import React, { Component, createRef } from 'react';
import { Button, Form } from 'antd';
import ProjectSelect from '@/pages/build/components/ProjectSelect';
import ImageSelect from '@/pages/deploy/components/ImageSelect';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

interface DeployFormProps {
  selectProject: any;
  deploy: any;
  loading: boolean;
}

interface DeployFormState {
  projectId: any
}

class DeployForm extends Component<DeployFormProps, DeployFormState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      projectId: undefined,
    };
  }

  onFinish = (values: any) => {
    this.props.deploy(values);
  };

  onChange = (value: any) => {
    this.props.selectProject(value);
    const { current } = this.form;
    current.setFieldsValue({ project_id: value, image_name: undefined });
  };

  onValueChange = (changedValue: any) => {
    const { project_id } = changedValue;
    if (project_id !== undefined) {
      this.setState({
        projectId: project_id,
      });
    }
  };

  render() {
    return <Form
      {...layout}
      onFinish={this.onFinish}
      onValuesChange={this.onValueChange}
      ref={this.form}
    >
      <Form.Item
        label="项目"
        name="project_id"
        rules={[{ required: true, message: '请选择项目' }]}
      >
        <ProjectSelect onChange={this.onChange}/>
      </Form.Item>
      <Form.Item
        label="镜像"
        name="image_name"
        rules={[{ required: true, message: '请选择镜像' }]}
      >
        <ImageSelect project_id={this.state.projectId}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          loading={this.props.loading}
        >
          发布
        </Button>
      </Form.Item>
    </Form>;
  }
}

export default DeployForm;
