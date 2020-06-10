import React, { Component } from 'react';
import { Button, Divider, Drawer, Form, Input, Select } from 'antd';
import TemplateSelect from '@/pages/project/components/TemplateSelect';
import DckTypeSelect from '@/pages/project/components/DckTypeSelect';
import BuildTypeSelect from '@/pages/project/components/BuildTypeSelect';
import NginxProxy from '@/pages/project/components/NginxProxy';
import NamespaceSelect from '@/pages/project/components/NamespaceSelect';
import { TEMPLATE_TYPE } from '@/constants/template';

interface ProjectFormProps {
  initialValues?: any;
  visible: boolean;
  title: string;
  onCancel: any;
  onOk: any;
}

interface ProjectFormState {
  dockerfileType: any;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const layoutWithoutLabel = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 6 },
};

const { Option } = Select;

class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  formRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      dockerfileType: props.initialValues.dockerfile_type,
    };
  }

  componentDidMount(): void {
  }

  componentWillReceiveProps(nextProps: any): void {
    if (this.props !== nextProps) {
      this.setState({
        dockerfileType: nextProps.initialValues.dockerfile_type,
      });
    }
  }

  onValuesChange = (changedValues: any) => {
    const { dockerfile_type } = changedValues;
    if (dockerfile_type !== undefined) {
      this.setState({
        dockerfileType: dockerfile_type,
      });
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
            <Button onClick={
              () => {
                this.formRef.current.validateFields().then((values: any) => {
                  this.props.onOk(values);
                  this.formRef.current.resetFields();
                }).catch(() => {
                });
              }
            } type="primary">
              确定
            </Button>
          </div>
        }
      >
        <Form
          {...layout}
          name="project"
          initialValues={this.props.initialValues || {}}
          onValuesChange={this.onValuesChange}
          ref={this.formRef}
        >
          <Divider orientation="left">
            <span>基础信息</span>
          </Divider>
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input/>
          </Form.Item>
          <Form.Item
            label="命名空间"
            name="namespace"
            rules={[{ required: true, message: '请选择命名空间' }]}
          >
            <NamespaceSelect/>
          </Form.Item>
          <Form.Item
            label="项目名"
            name="name"
            rules={[
              { required: true, message: '请输入项目名' },
              { pattern: /^[a-z]([-_a-z0-9]{2,15})$/, message: '3-15位以字母开头，可包含数字、_、-、小写字母' },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="类型"
            name="type"
            rules={[{ required: true, message: '请选择项目类型' }]}
          >
            <Select>
              <Option value={0}>前端</Option>
              <Option value={1}>后端</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="logo"
            name="logo"
            extra="请将logo上传到git仓库，填写该logo地址即可"
            rules={[{ required: true, message: '请上传logo' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="git仓库"
            name="git"
            rules={[{ required: true, message: '请填写仓库地址' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: '请填写描述' }]}
          >
            <Input/>
          </Form.Item>
          <Divider orientation="left">
            <span>构建配置</span>
          </Divider>
          <Form.Item
            label="构建方式"
            name="build_type"
            rules={[{ required: true, message: '请选择构建方式' }]}
          >
            <BuildTypeSelect/>
          </Form.Item>
          <Divider orientation="left">
            <span>镜像制作</span>
          </Divider>
          <Form.Item
            label="dockerfile类型"
            name="dockerfile_type"
            rules={[{ required: true, message: '请选择dockerfile类型' }]}
          >
            <DckTypeSelect/>
          </Form.Item>
          {
            this.state.dockerfileType === 1 ?
              <>
                <Form.Item
                  label="dockerfile 模板"
                  name="docker_template_id"
                  extra="需要使用docker方式构建的项目"
                >
                  <TemplateSelect type={TEMPLATE_TYPE.DOCKERFILE}/>
                </Form.Item>
                <Form.Item
                  label="基镜像"
                  name="base_image"
                  extra="前端项目仅支持nginx部署"
                >
                  <Select>
                    <Option value='nginx'>nginx</Option>
                    <Option
                      value='harbor.bchen.xyz/library/python-36-centos7:latest'>harbor.bchen.xyz/library/python-36-centos7:latest</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="nginx 模板"
                  name="nginx_template_id"
                  extra="需要使用nginx方式构建的项目"
                >
                  <TemplateSelect type={TEMPLATE_TYPE.NGINX}/>
                </Form.Item>
                <Form.List
                  name="nginx_proxies"
                >
                  {
                    (fields: any, { add, remove }) => {
                      return <NginxProxy
                        fields={fields}
                        add={add}
                        remove={remove}
                        layoutWithoutLabel={layoutWithoutLabel}
                        layout={layout}
                      />;
                    }
                  }
                </Form.List>
              </> : null
          }
          <Divider orientation="left">
            <span>发布配置</span>
          </Divider>
          <Form.Item
            label="deployment模板"
            name="deployment_template_id"
            rules={[{ required: true, message: '请选择deployment模板' }]}
          >
            <TemplateSelect type={TEMPLATE_TYPE.K8S_DEPLOYMENT}/>
          </Form.Item>
          <Form.Item
            label="svc模板"
            name="svc_template_id"
            rules={[{ required: true, message: '请选择service模板' }]}
          >
            <TemplateSelect type={TEMPLATE_TYPE.K8S_SERVICE}/>
          </Form.Item>
          <Form.Item
            label="ingress模板"
            name="ingress_template_id"
            rules={[{ required: true, message: '请选择ingress模板' }]}
          >
            <TemplateSelect type={TEMPLATE_TYPE.K8S_INGRESS}/>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default ProjectForm;
