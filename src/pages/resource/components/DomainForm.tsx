import React, { Component } from 'react';
import { Button, Form, Input, Switch, Upload } from 'antd';
import HostSelect from '@/pages/resource/components/HostSelect';
import { UploadOutlined } from '@ant-design/icons';
import ServiceSelect from '@/pages/resource/components/ServiceSelect';

interface DomainFormProps {
  form: any;
  initialValues: any
}

interface DomainFormState {

}

class DomainForm extends Component<DomainFormProps, DomainFormState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  normFile = (e: any) => {
    console.log('e', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    return <Form
      ref={this.props.form}
      initialValues={this.props.initialValues}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
      layout="horizontal"
    >
      <Form.Item
        label="域名"
        name="domain"
        rules={[
          { required: true, message: '不允许为空' },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="域名解析机器"
        name="host_id"
        rules={[
          { required: true, message: '不允许为空' },
        ]}
      >
        <HostSelect/>
      </Form.Item>
      <Form.Item
        label="监听端口"
        name="port"
        rules={[
          { required: true, message: '不允许为空' },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="代理"
        name="proxy"
        extra="配套的后端服务，后端要自己维护一下project->service"
      >
        <ServiceSelect/>
      </Form.Item>
      <Form.Item
        label="开启https"
        name="ssl"
        valuePropName="checked"
      >
        <Switch/>
      </Form.Item>
      <Form.Item
        label="上传证书"
        name="certificate"
        valuePropName="fileList"
        getValueFromEvent={this.normFile}
      >
        <Upload
          name='file'
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          headers={{
            authorization: 'authorization-text',
          }}
        >
          <Button>
            <UploadOutlined/> Click to Upload
          </Button>
        </Upload>
      </Form.Item>

    </Form>;
  }
}

export default DomainForm;
