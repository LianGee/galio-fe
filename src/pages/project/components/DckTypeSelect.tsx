import React, { Component } from 'react';
import { Radio, Row, Typography } from 'antd';

interface DckTypeSelectProps {
  value?: any;
  onChange?: any;
}

interface DckTypeSelectState {
  value: any;
}

const { Text } = Typography;

class DckTypeSelect extends Component<DckTypeSelectProps, DckTypeSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange = (e: any) => {
    this.props.onChange(e);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return <div>
      <Row>
        <Radio.Group
          onChange={this.onChange}
          value={this.props.value}
          defaultValue={this.props.value}
        >
          <Radio value={0}>自定义</Radio>
          <Radio value={1}>基于模板</Radio>
        </Radio.Group>
      </Row>
      <Row>
        {
          this.state.value === 0 ?
            <Text type="warning">源代码根目录下必须存在dockerfile</Text> :
            <Text type="secondary">根据不同模板进行配置生成dockerfile</Text>
        }
      </Row>
    </div>;
  }
}

export default DckTypeSelect;
