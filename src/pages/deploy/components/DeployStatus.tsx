import React, { Component } from 'react';
import { Col, Progress, Row, Timeline } from 'antd';
import * as moment from 'moment';

interface DeployStatusProps {
  replica: any;
  events: any;
}

interface DeployStatusState {
  percent: number;
  format: string;
  events: any;
}

class DeployStatus extends Component<DeployStatusProps, DeployStatusState> {
  constructor(props: any) {
    super(props);
    this.state = {
      percent: 0,
      format: '0/0',
      events: [],
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
    const { events } = nextProps;
    this.setState({
      events: this.parseEvents(events),
    });
  }

  parseEvents = (events: any) => {
    const evs = [];
    for (let i = 0; i < events.length; i += 1) {
      if (events[i].firstTimestamp && events[i].lastTimestamp) {
        evs.push({
          key: i,
          type: events[i].type,
          message: events[i].message,
          reason: events[i].reason,
          firstTimestamp: moment(events[i].firstTimestamp),
          lastTimestamp: moment(events[i].lastTimestamp),
        });
      }
    }
    return evs.sort((a, b) => a.lastTimestamp.valueOf() - b.lastTimestamp.valueOf());
  };

  render() {
    return <Row align="top" justify="space-between">
      <Col span={6}>
        <Progress
          type="circle"
          percent={this.state.percent}
          format={() => this.state.format}
        />
      </Col>
      <Col
        span={this.state.events.length > 0 ? 18 : 0}
        style={{ height: 150, overflow: 'auto' }}
      >
        <Timeline
          style={{ margin: 10 }}
          mode="left"
          reverse
        >
          {
            this.state.events.map((item: any) =>
              <Timeline.Item
                label={<span>
                  {item.lastTimestamp.format('YYYY-MM-DD HH:mm:ss')}<br/>{item.reason}
                </span>}
                key={item.key}
                color={item.type === 'Normal' ? 'blue' : 'red'}
              >
                {item.message}
              </Timeline.Item>)
          }
        </Timeline>
      </Col>
    </Row>;
  }
}

export default DeployStatus;
