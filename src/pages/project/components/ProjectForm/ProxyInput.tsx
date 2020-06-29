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
  name: any;
}

class ProxyInput extends Component<ProxyInputProps, ProxyInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...props.value,
    };
  }

  onNameChange = (e: any) => {
    const data = {
      name: e.target.value,
      rule: this.state.rule,
      server: this.state.server,
    };
    this.setState({...data});
    this.props.onChange({ ...data });
  };

  onRuleChange = (e: any) => {
    const data = {
      name: this.state.name,
      rule: e.target.value,
      server: this.state.server,
    };
    this.setState({ ...data });
    this.props.onChange({ ...data });
  };

  onServerChange = (e: any) => {
    const data = {
      name: this.state.name,
      rule: this.state.rule,
      server: e.target.value,
    };
    this.setState({ ...data });
    this.props.onChange({ ...data });
  };

  render() {
    const { field, remove } = this.props;
    return <Row>
      <Col span={5}>
        <Input
          placeholder="代理名"
          onChange={this.onNameChange}
          defaultValue={this.props.value ? this.props.value.name : ''}
        />
      </Col>
      <Col span={5}>
        <Input
          placeholder="匹配规则"
          onChange={this.onRuleChange}
          defaultValue={this.props.value ? this.props.value.rule : ''}
        />
      </Col>
      <Col span={12}>
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
