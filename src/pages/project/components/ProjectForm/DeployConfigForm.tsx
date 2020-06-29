import React, { Component } from 'react';
import { Form } from 'antd';
import TemplateSelect from '@/pages/project/components/ProjectForm/TemplateSelect';
import { TEMPLATE_TYPE } from '@/constants/template';

interface DeployConfigFormProps {
  layout: any;
  initialValues: any;
  formRef: any;
}

interface DeployConfigFormState {

}

class DeployConfigForm extends Component<DeployConfigFormProps, DeployConfigFormState> {
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
      >
        <TemplateSelect type={TEMPLATE_TYPE.K8S_INGRESS}/>
      </Form.Item>
    </Form>;
  }
}

export default DeployConfigForm;
