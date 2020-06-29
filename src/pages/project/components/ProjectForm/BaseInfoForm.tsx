import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import NamespaceSelect from '@/pages/project/components/ProjectForm/NamespaceSelect';

interface BaseInfoFormProps {
  layout: any;
  initialValues: any;
  formRef: any;
}

interface BaseInfoFormState {

}

const { Option } = Select;

class BaseInfoForm extends Component<BaseInfoFormProps, BaseInfoFormState> {
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
    </Form>;
  }
}

export default BaseInfoForm;
