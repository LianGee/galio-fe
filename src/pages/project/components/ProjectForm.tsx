import React, { Component } from 'react';
import { Button, Divider, Drawer } from 'antd';
import BaseInfoForm from '@/pages/project/components/ProjectForm/BaseInfoForm';
import BuildConfigForm from '@/pages/project/components/ProjectForm/BuildConfigForm';
import DockerForm from '@/pages/project/components/ProjectForm/DockerForm';
import DeployConfigForm from '@/pages/project/components/ProjectForm/DeployConfigForm';

interface ProjectFormProps {
  initialValues?: any;
  visible: boolean;
  title: string;
  onCancel: any;
  onOk: any;
}

interface ProjectFormState {
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const layoutWithoutLabel = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 6 },
};


class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  baseInfoRef: any = React.createRef();

  buildConfigRef: any = React.createRef();

  dockerRef: any = React.createRef();

  deployConfigRef: any = React.createRef();

  onSubmit = async () => {
    let baseInfo: any;
    let buildConfig: any;
    let docker: any;
    let deployConfig: any;
    await this.baseInfoRef.current.validateFields().then((values: any) => {
      baseInfo = values;
    }).catch(() => {
    });
    await this.buildConfigRef.current.validateFields().then((values: any) => {
      buildConfig = values;
    }).catch(() => {
    });
    await this.dockerRef.current.validateFields().then((values: any) => {
      docker = values;
    }).catch(() => {
    });
    await this.deployConfigRef.current.validateFields().then((values: any) => {
      deployConfig = values;
    }).catch(() => {
    });
    if (baseInfo && buildConfig && docker && deployConfig) {
      this.props.onOk({
        ...baseInfo,
        ...buildConfig,
        ...docker,
        ...deployConfig,
      });
      this.baseInfoRef.current.resetFields();
      this.buildConfigRef.current.resetFields();
      this.dockerRef.current.resetFields();
      this.deployConfigRef.current.resetFields();
    }
  };

  render() {
    return (
      <Drawer
        title={this.props.title}
        placement="right"
        destroyOnClose
        onClose={this.props.onCancel}
        visible={this.props.visible}
        width={700}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              onClick={this.props.onCancel}
              style={{ marginRight: 8 }}
            >
              取消
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              确定
            </Button>
          </div>
        }
      >
        <Divider orientation="left">
          <span>基础信息</span>
        </Divider>
        <BaseInfoForm
          layout={layout}
          initialValues={this.props.initialValues}
          formRef={this.baseInfoRef}
        />
        <Divider orientation="left">
          <span>构建配置</span>
        </Divider>
        <BuildConfigForm
          layout={layout}
          initialValues={this.props.initialValues}
          formRef={this.buildConfigRef}
        />
        <Divider orientation="left">
          <span>镜像制作</span>
        </Divider>
        <DockerForm
          layout={layout}
          layoutWithoutLabel={layoutWithoutLabel}
          initialValues={this.props.initialValues}
          formRef={this.dockerRef}
        />
        <Divider orientation="left">
          <span>发布配置</span>
        </Divider>
        <DeployConfigForm
          layout={layout}
          initialValues={this.props.initialValues}
          formRef={this.deployConfigRef}
        />
      </Drawer>
    );
  }
}

export default ProjectForm;
