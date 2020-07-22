import React, { Component } from 'react';
import io from 'socket.io-client';
import { getPageQuery } from '@/utils/utils';
import { Button, Col, InputNumber, Layout, Row, Select, Switch } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import styles from './index.less';

interface LogProps {

}

interface LogState {
  logs: any;
  pod: any;
  theme: 'vs-dark' | 'vs-light';
  fontSize: number;
  tail_lines: number;
  trace: boolean;
}

const socket = io('http://127.0.0.1:8010/galio/deploy');
const { Header, Footer, Content } = Layout;
const { Option } = Select;

class Log extends Component<LogProps, LogState> {
  editor: any;

  interval: any;

  constructor(props: any) {
    super(props);
    this.state = {
      logs: [],
      pod: getPageQuery(),
      theme: 'vs-dark',
      fontSize: 12,
      tail_lines: 100,
      trace: true,
    };
  }

  componentDidMount(): void {
    socket.connect();
    this.init();
  }

  componentWillUnmount(): void {
    socket.disconnect();
    socket.close();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onTrace = (checked: boolean) => {
    this.setState({ trace: checked });
  };

  onSelectTailLine = () => {
    setTimeout(() => {
      const { pod, tail_lines, trace } = this.state;
      socket.emit('log', { ...pod, tail_lines, trace });
    }, 1000);
  };

  init = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    let logs: any = [];
    const { pod, tail_lines, trace } = this.state;
    socket.emit('log', { ...pod, tail_lines, trace });
    socket.on('log', (data: any) => {
      if (logs.length > 10000) {
        logs = logs.slice(logs.length - 10000, logs.length + 1);
      }
      logs.push(data);
      this.editor.setPosition({ lineNumber: logs.length, column: data.length });
      this.interval = setInterval(() => {
        if (this.state.trace) {
          const maxLen = this.state.tail_lines;
          if (logs.length > maxLen) {
            this.setState({
              logs: logs.slice(logs.length - maxLen, logs.length + 1),
            });
          } else {
            this.setState({
              logs,
            });
          }
        }
      }, 200);
    });
  };

  prevLog = () => {
    window.location.href = `${window.location}&previous=true`;
  };

  downLoad = () => {
    const { name, namespace } = this.state.pod;
    window.open(`/api/deploy/download/log?name=${name}&namespace=${namespace}&tail_lines=${100000}`);
  };

  editorDidMount = (editor: any) => {
    this.editor = editor;
  };

  render() {
    return <Layout
      style={{ width: '100%', minHeight: '100%' }}
    >
      <Header className={styles.header}>
        <Row>
          <Col span={6}>
            字体
            <InputNumber
              min={12}
              max={20}
              value={this.state.fontSize}
              onChange={(value: any) => {
                this.setState({ fontSize: value });
              }}
              style={{ marginLeft: 5 }}
            />
            <Button
              type="primary"
              style={{ marginLeft: 5 }}
              onClick={() => {
                const { theme } = this.state;
                if (theme === 'vs-dark') {
                  this.setState({ theme: 'vs-light' });
                } else {
                  this.setState({
                    theme: 'vs-dark',
                  });
                }
              }}
            >主题切换</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <strong>{this.state.pod.name} 日志</strong>
          </Col>
        </Row>
      </Header>
      <Content className={styles.content}>
        <MonacoEditor
          height="100%"
          width="100%"
          theme={this.state.theme}
          value={this.state.logs.join('\n')}
          options={{
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
            cursorStyle: 'line',
            readOnly: true,
            fontSize: this.state.fontSize,
          }}
          editorDidMount={this.editorDidMount}
        />
      </Content>
      <Footer className={styles.footer}>
        行数
        <Select
          style={{ marginLeft: 10, minWidth: 100 }}
          value={this.state.tail_lines}
          onChange={(value: any) => this.setState({ tail_lines: value })}
          onSelect={this.onSelectTailLine}
        >
          <Option value={100}>100</Option>
          <Option value={500}>500</Option>
          <Option value={1000}>1000</Option>
          <Option value={10000}>10000</Option>
        </Select>
        <Switch
          style={{ marginLeft: 10 }}
          checkedChildren="开启追踪"
          unCheckedChildren="关闭追踪"
          checked={this.state.trace}
          onChange={this.onTrace}
        />
        <span style={{ marginLeft: 10 }}>
          控制台最多显示12h前最近1w行日志，查看更多日志请下载到本地
        </span>
        <Button
          style={{ float: 'right', marginLeft: 10, marginTop: 10 }}
          onClick={this.downLoad}
        >下载日志</Button>
        <Button
          style={{ float: 'right', marginTop: 10 }}
          onClick={this.prevLog}
        >查看上一次退出日志</Button>
      </Footer>
    </Layout>;
  }
}

export default Log;
