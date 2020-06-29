import React, { Component } from 'react';
import { Col, Progress, Row, Steps } from 'antd';
import { StepContent } from '@/components/StepProgress/StepProgress';
import { CheckCircleOutlined, CloseCircleOutlined, CoffeeOutlined, SyncOutlined } from '@ant-design/icons';

interface StepProgressProps {
  steps: [StepContent];
  progress: any;
}

interface StepProgressState {
}

const { Step } = Steps;

class StepProgress extends Component<StepProgressProps, StepProgressState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  renderDescription = (index: number) => {
    const { progress } = this.props;
    const iconMap = {
      'wait': <CoffeeOutlined/>,
      'process': <SyncOutlined spin style={{ color: 'cyan' }}/>,
      'finish': <CheckCircleOutlined style={{ color: 'lime' }}/>,
      'error': <CloseCircleOutlined style={{ color: 'red' }}/>,
    };
    const step = progress.filter((item: any) => item.current === index).pop();
    const type = step ? step.type : 'wait';
    const description = step ? step.description : '等待开始';
    return <Row style={{ wordBreak: 'break-all' }}>
      <Col span={2}>
        {iconMap[type]}
      </Col>
      <Col span={22}>
        {description}
      </Col>
    </Row>;
  };

  render() {
    const { progress } = this.props;
    return <Row align="top" justify="space-between">
      <Col span={10}>
        <Progress
          type="circle"
          percent={progress.length > 0 ? progress.lastItem.percent : 0}
        />
      </Col>
      <Col span={14} style={{ overflow: 'auto' }}>
        <Steps
          direction="vertical"
          current={progress.length > 0 ? progress.lastItem.current : 0}
          size="small"
          status={progress.length > 0 ? progress.lastItem.type : 0}
        >
          {
            this.props.steps.map((step, index) => (
              <Step
                title={step.title}
                description={this.renderDescription(index)}
                icon={step.icon}
                key={step.title}
              />
            ))
          }
        </Steps>
      </Col>
    </Row>;
  }
}

export default StepProgress;
