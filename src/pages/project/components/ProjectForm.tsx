import React, { Component } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import TemplateSelect from '@/pages/project/components/TemplateSelect';

interface ProjectFormProps {
  initialValues?: any;
  visible: boolean;
  onCancel: any;
  onOk: any;
}

interface ProjectFormState {
  domainCheck: boolean;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  formRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      domainCheck: true,
    };
  }

  componentDidMount(): void {
  }

  render() {
    const onChange = (value: any) => {
      if (value === 0) {
        this.setState({ domainCheck: true });
      } else {
        this.setState({ domainCheck: false });
      }
    };
    return (
      <Modal
        destroyOnClose
        centered
        title="新建项目"
        width={600}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={() => {
          this.formRef.current.validateFields().then((values: any) => {
            this.props.onOk(values);
            this.formRef.current.resetFields();
          }).catch(() => {
          });
        }}
      >
        <Form
          {...layout}
          name="project"
          initialValues={this.props.initialValues || {}}
          ref={this.formRef}
        >
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input/>
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
            <Select onChange={onChange}>
              <Option value={0}>前端</Option>
              <Option value={1}>后端</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="构建方式"
            name="build_type"
            rules={[{ required: true, message: '请选择构建方式' }]}
          >
            <Select>
              <Option value={0}>dist</Option>
              <Option value={1}>python2</Option>
              <Option value={2}>python3</Option>
              <Option value={3}>java1.8/maven3.6</Option>
              <Option value={4}>java1.8/gradle4.10</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="dockerfile 模板"
            name="docker_template_id"
            extra="需要使用docker方式构建的项目"
          >
            <TemplateSelect type={0}/>
          </Form.Item>
          <Form.Item
            label="nginx 模板"
            name="nginx_template_id"
            extra="需要使用nginx方式构建的项目"
          >
            <TemplateSelect type={1}/>
          </Form.Item>
          <Form.Item
            label="域名"
            name="domain"
            rules={[{ required: this.state.domainCheck, message: '请填写域名' }]}
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
            label="logo"
            name="logo"
            extra="请将logo上传到git仓库，填写该logo地址即可"
            required
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="基镜像"
            name="base_image"
            extra="前端项目仅支持nginx部署"
            required
          >
            <Select>
              <Option value='nginx'>nginx</Option>
              <Option
                value='harbor.bchen.xyz/library/python-36-centos7:latest'>harbor.bchen.xyz/library/python-36-centos7:latest</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="端口"
            name="port"
            required
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            required
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default ProjectForm;
