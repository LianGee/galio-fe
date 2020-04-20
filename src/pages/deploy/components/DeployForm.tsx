import React, { Component } from 'react';
import { Button, Form } from 'antd';
import ProjectSelect from '@/pages/build/components/ProjectSelect';
import ImageSelect from '@/pages/deploy/components/ImageSelect';
import { deploy } from '@/services/deploy';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

interface DeployFormProps {
  selectProject: any;
}

interface DeployFormState {

}

class DeployForm extends Component<DeployFormProps, DeployFormState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onFinish = (values: any) => {
    deploy(values).then(response => {
      if (response.status === 0) {
        console.log(response.data);
      }
    });
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
        <Button type="primary" htmlType="submit">
          发布
        </Button>
      </Form.Item>
    </Form>;
  }
}

export default DeployForm;
