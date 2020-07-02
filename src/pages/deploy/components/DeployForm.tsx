import React, { Component, createRef } from 'react';
import { Button, Drawer, Form, message } from 'antd';
import ProjectSelect from '@/pages/build/components/ProjectSelect';
import ImageSelect from '@/pages/deploy/components/ImageSelect';
import { SettingOutlined } from '@ant-design/icons/lib';
import DeployConfigFrom from '@/pages/deploy/components/DeployConfigFrom';
import { queryProjectById } from '@/services/project';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
};

interface DeployFormProps {
  selectProject: any;
  deploy: any;
  loading: boolean;
  initialValues: any;
}

interface DeployFormState {
  visible: boolean;
  project: any;
}

class DeployForm extends Component<DeployFormProps, DeployFormState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      project: {},
    };
  }

  onFinish = (values: any) => {
    this.props.deploy(values);
  };

  onChange = (value: any) => {
    queryProjectById(value).then(response => {
      this.setState({
        project: response.data,
        visible: false,
      });
      this.props.selectProject(response.data);
      const { current } = this.form;
      current.setFieldsValue({ project_id: value, image_name: undefined });
    });
  };

  showDeployConfig = () => {
    if (this.state.project.id) {
      this.setState({ visible: true });
    } else {
      message.warn('请先选择项目');
    }
  };

  onSaveDeployConfig = () => {
    queryProjectById(this.state.project.id).then(response => {
      this.setState({
        project: response.data,
        visible: false,
      });
    });
  };

  render() {
    return <>
      <Form
        {...layout}
        onFinish={this.onFinish}
        ref={this.form}
        initialValues={this.props.initialValues}
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
          <ImageSelect project_id={this.state.project.id}/>
        </Form.Item>
        <Form.Item {...tailLayout} style={{ textAlign: 'right' }}>
          <SettingOutlined
            style={{ marginRight: 20, fontSize: 18, textAlign: 'center' }}
            onClick={this.showDeployConfig}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.loading}
          >
            发布
          </Button>
        </Form.Item>
      </Form>
      <Drawer
        title="发布配置"
        width={700}
        destroyOnClose
        visible={this.state.visible}
        onClose={() => this.setState({ visible: false })}
      >
        <DeployConfigFrom
          project={this.state.project}
          onSaveDeployConfig={this.onSaveDeployConfig}
        />
      </Drawer>
    </>;
  }
}

export default DeployForm;
