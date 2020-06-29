import React, { Component } from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProxyInput from '@/pages/project/components/ProjectForm/ProxyInput';

interface NginxProxyProps {
  value?: any;
  onChange?: any;
  fields: any;
  add: any;
  remove: any;
  layoutWithoutLabel: any;
  layout: any;
}

interface NginxProxyState {

}

class NginxProxy extends Component<NginxProxyProps, NginxProxyState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { layout, layoutWithoutLabel, add, fields, remove } = this.props;
    return <>
      {
        fields.map((field: any, index: any) => (
          <Form.Item
            {...index === 0 ? layout : layoutWithoutLabel}
            {...field}
            label={index === 0 ? 'nginx代理' : ''}
          >
            <ProxyInput field={field} remove={remove}/>
          </Form.Item>
        ))
      }
      <Form.Item {...layoutWithoutLabel}>
        <Button
          type="dashed"
          onClick={() => {
            add();
          }}
        >
          <PlusOutlined/> 添加规则
        </Button>
      </Form.Item>
    </>;
  }
}

export default NginxProxy;
