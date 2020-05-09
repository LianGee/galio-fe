import React, { Component } from 'react';
import { Radio, Row } from 'antd';

interface SvcTypeSelectProps {
  value?: any;
  onChange?: any;
}

interface SvcTypeSelectState {
}

// const { Text } = Typography;

class SvcTypeSelect extends Component<SvcTypeSelectProps, SvcTypeSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  onChange = (e: any) => {
    this.props.onChange(e);
    // this.setState({
    //   value: e.target.value,
    // });
  };

  render() {
    return <div>
      <Row>
        <Radio.Group onChange={this.onChange} value={this.props.value}>
          <Radio value={0}>仅在集群内访问</Radio>
          <Radio value={1}>主机端口访问</Radio>
          <Radio value={2}>VPC内网访问</Radio>
        </Radio.Group>
      </Row>
    </div>;
  }
}

export default SvcTypeSelect;
