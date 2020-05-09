import React, { Component } from 'react';
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
}

class DeployForm extends Component<DeployFormProps, DeployFormState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onFinish = (values: any) => {
    this.props.deploy(values);
  };

  onChange = (value: any) => {
    this.props.selectProject(value);
  };

  render() {
    return <Form
      {...layout}
      onFinish={this.onFinish}
    >
      <Form.Item
        label="项目"
        name="project_id"
        required
      >
        <ProjectSelect onChange={this.onChange}/>
      </Form.Item>
      <Form.Item
        label="镜像"
        name="image_name"
        required
      >
        <ImageSelect/>
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