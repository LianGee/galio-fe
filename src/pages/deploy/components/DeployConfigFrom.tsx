import React, { Component } from 'react';
import { Button, Form, message } from 'antd';
import { FormList } from '@/pages/deploy/components/FormList';
import { PairFormList } from '@/pages/deploy/components/PairFormList';
import PairInput from '@/pages/deploy/components/PairInput';
import { saveDeployConfig } from '@/services/project';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layoutWithoutLabel = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20, offset: 4 },
};

interface DeployConfigFromProps {
  onSaveDeployConfig: any;
  project: any;
}

interface DeployConfigFromState {

}

class DeployConfigFrom extends Component<DeployConfigFromProps, DeployConfigFromState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onDeployConfigFinish = (values: any) => {
    saveDeployConfig({
      project_id: this.props.project.id,
      deploy_config: { ...values },
    }).then(response => {
      if (response.data) {
        message.success('保存成功');
        this.props.onSaveDeployConfig();
      }
    });
  };

  render() {
    return <Form
      {...layout}
      name="deploy_config"
      onFinish={this.onDeployConfigFinish}
      initialValues={this.props.project.deploy_config}
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
        <PairInput
          useNum
          firstPlaceholder="最小值"
          secondPlaceHolder="最大值"
          names={['request', 'limit']}
        />
      </Form.Item>
      <Form.Item
        name="memory"
        label="内存"
      >
        <PairInput
          useNum
          firstPlaceholder="最小值"
          secondPlaceHolder="最大值"
          names={['request', 'limit']}
        />
      </Form.Item>
      <Form.Item {...layoutWithoutLabel}>
        <Button
          type="primary"
          htmlType="submit"
        >
          保存
        </Button>
      </Form.Item>
    </Form>;
  }
}

export default DeployConfigFrom;
