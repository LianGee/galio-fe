import React, { Component } from 'react';
import { Row, Select, Typography } from 'antd';

interface BuildTypeSelectProps {
  value?: any;
  onChange?: any;
}

interface BuildTypeSelectState {
  value: any;
}

const { Option } = Select;
const { Text } = Typography;

class BuildTypeSelect extends Component<BuildTypeSelectProps, BuildTypeSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange = (value: any) => {
    this.props.onChange(value);
    this.setState({ value });
  };

  getTips = () => {
    const tips: any = [
      <Text type="secondary">执行npm install</Text>,
      <Text type="secondary">执行tar -czvf project.name.tar ./</Text>,
      <Text type="secondary">优先寻找mvnw如果存在mvnw clean package否则mvn clean package</Text>,
      <Text type="secondary">优先寻找gradlew如果存在gradlew clean package否则gradle clean package</Text>,
      <Text type="warning">执行sh build.sh 根目录下必须存在build.sh，请注意build.sh的安全</Text>
    ];
    return tips[this.state.value];
  };

  render() {
    return <div>
      <Select value={this.props.value} onChange={this.onChange}>
        <Option value={0}>npm</Option>
        <Option value={1}>tar</Option>
        <Option value={2}>mvn</Option>
        <Option value={3}>gradle</Option>
        <Option value={4}>自定义</Option>
      </Select>
      <Row>
        {this.getTips()}
      </Row>
    </div>;
  }
}

export default BuildTypeSelect;
