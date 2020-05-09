import React, { Component } from 'react';
import { Col, Input, Row } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

interface ProxyInputProps {
  field: any;
  remove: any;
  value?: any;
  onChange?: any;
}

interface ProxyInputState {
  rule: any;
  server: any;
}

class ProxyInput extends Component<ProxyInputProps, ProxyInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...props.value
    };
  }

  onRuleChange = (e: any) => {
    const data = {
      rule: e.target.value,
      server: this.state.server,
    };
    this.setState({ ...data });
    this.props.onChange({ ...data });
  };

  onServerChange = (e: any) => {
    const data = {
      rule: this.state.rule,
      server: e.target.value,
    };
    this.setState({ ...data });
    this.props.onChange({ ...data });
  };

  render() {
    const { field, remove } = this.props;
    return <Row>
      <Col span={6}>
        <Input
          placeholder="匹配规则"
          onChange={this.onRuleChange}
          defaultValue={this.props.value ? this.props.value.rule : ''}
        />
      </Col>
      <Col span={16}>
        <Input
          placeholder="转发服务"
          onChange={this.onServerChange}
          defaultValue={this.props.value ? this.props.value.server : ''}
        />
      </Col>
      <Col span={2}>
        {
          field ?
            <MinusCircleOutlined
              style={{ margin: '0 8px' }}
              onClick={() => {
                remove(field.name);
              }}
            /> : null
        }
      </Col>
    </Row>;
  }
}

export default ProxyInput;
