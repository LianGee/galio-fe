import React, { Component, createRef } from 'react';
import { Button, Drawer, Form, message } from 'antd';
import ProjectSelect from '@/pages/build/components/ProjectSelect';
import ImageSelect from '@/pages/deploy/components/ImageSelect';
import { SettingOutlined } from '@ant-design/icons/lib';
import { FormList } from '@/pages/deploy/components/FormList';
import { PairFormList } from '@/pages/deploy/components/PairFormList';
import PairInput from '@/pages/deploy/components/PairInput';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};

const layoutWithoutLabel = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20, offset: 4 },
};

interface DeployFormProps {
  selectProject: any;
  deploy: any;
  loading: boolean;
  initialValues: {};
}

interface DeployFormState {
  project_id: any;
  visible: boolean;
}

class DeployForm extends Component<DeployFormProps, DeployFormState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      project_id: props.initialValues.project_id,
      visible: false,
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
        project_id,
      });
    }
  };

  render() {
    return <>
      <Form
        {...layout}
        onFinish={this.onFinish}
        onValuesChange={this.onValueChange}
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
          <ImageSelect project_id={this.state.project_id}/>
        </Form.Item>
        <Form.Item {...tailLayout} style={{ textAlign: 'right' }}>
          <SettingOutlined
            style={{ marginRight: 20, fontSize: 18, textAlign: 'center' }}
            onClick={() => {
              if (this.state.project_id) {
                this.setState({ visible: true });
              } else {
                message.warn('请先选择项目');
              }
            }}
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
        visible={this.state.visible}
        onClose={() => this.setState({ visible: false })}
      >
        <Form
          {...layout}
        >
          <FormList
            name="command"
            layout={layout}
            layoutWithoutLabel={layoutWithoutLabel}
          />
          <FormList
            name="args"
            layout={layout}
            layoutWithoutLabel={layoutWithoutLabel}
          />
          <PairFormList
            name="env"
            label="环境变量"
            firstPlaceholder="变量名"
            secondPlaceHolder="值"
            useNum={false}
            layout={layout}
            layoutWithoutLabel={layoutWithoutLabel}
          />
          <Form.Item
            name="cpu"
            label="cpu"
          >
            <PairInput useNum secondPlaceHolder="最小值" firstPlaceholder="最大值"/>
          </Form.Item>
          <Form.Item
            name="memory"
            label="内存"
          >
            <PairInput useNum secondPlaceHolder="最小值" firstPlaceholder="最大值"/>
          </Form.Item>
        </Form>
      </Drawer>
    </>;
  }
}

export default DeployForm;
