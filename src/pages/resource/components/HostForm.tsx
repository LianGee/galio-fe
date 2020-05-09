import React, { Component } from 'react';
import { Form, Input } from 'antd';

interface HostFormProps {
  form: any;
  initialValues: any;
}

interface HostFormState {

}

class HostForm extends Component<HostFormProps, HostFormState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <Form
      ref={this.props.form}
      initialValues={this.props.initialValues}
    >
      <Form.Item name="id" style={{ display: 'none' }}>
        <Input/>
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[
          { required: true, message: '请填写名称' },
          { max: 127, message: '不超过127字符' },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="公网ip"
        name="public_ip"
        rules={[
          { required: true, message: '请填写公网ip' },
          {
            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
            message: 'ip地址不规范',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="内网ip"
        name="internal_ip"
        rules={[
          { required: true, message: '请填写公网ip' },
          {
            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
            message: 'ip地址不规范',
          },
        ]}
      >
        <Input/>
      </Form.Item>
    </Form>;
  }
}

export default HostForm;
