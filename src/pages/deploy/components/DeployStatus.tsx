import React, { Component } from 'react';
import { Col, Progress, Row } from 'antd';

interface DeployStatusProps {
  replica: any;
}

interface DeployStatusState {
  percent: number;
  format: string;
}

class DeployStatus extends Component<DeployStatusProps, DeployStatusState> {
  constructor(props: any) {
    super(props);
    this.state = {
      percent: 0,
      format: '0/0',
    };
  }

  componentWillReceiveProps(nextProps: any): void {
    const { status } = nextProps.replica;
    if (status) {
      const { readyReplicas, replicas } = status;
      if (readyReplicas && replicas) {
        this.setState({
          percent: readyReplicas / replicas * 100,
          format: `${readyReplicas}/${replicas}`,
        });
      }
    }
  }

  render() {
    return <Row align="top" justify="space-between">
      <Col span={6}>
        <Progress
          type="circle"
          percent={this.state.percent}
          format={() => this.state.format}
        />
      </Col>
    </Row>;
  }
}

export default DeployStatus;
