import React, { Component } from 'react';
import { Form, Input } from 'antd';

class DeployForm extends Component {
  render() {
    return <Form>
      <Form.Item label="项目">
        <Input/>
      </Form.Item>
      <Form.Item label="镜像">
        <Input/>
      </Form.Item>
    </Form>;
  }
}

export default DeployForm;
