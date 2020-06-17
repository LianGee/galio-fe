import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import io from 'socket.io-client';
import { getPageQuery } from '@/utils/utils';
import { Button, Col, Input, InputNumber, Layout, Row, Select, Switch } from 'antd';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons/lib';
import styles from './index.less';

interface LogProps {

}

interface LogState {
  logs: any;
  pod: any;
  theme: 'monokai' | 'github';
  fontSize: number;
  tail_lines: number;
  trace: boolean;
}

const socket = io('http://127.0.0.1:8010/galio/deploy');
const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

class Log extends Component<LogProps, LogState> {
  editor: any;

  interval: any;

  constructor(props: any) {
    super(props);
    this.state = {
      logs: [],
      pod: getPageQuery(),
      theme: 'github',
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
      setTimeout(() => {
        this.editor.editor.gotoLine(this.state.logs.length);
      }, 400);
    });
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
  };

  prevLog = () => {
    window.location.href = `${window.location}&previous=true`;
  };

  downLoad = () => {
    const { name, namespace } = this.state.pod;
    window.open(`/api/deploy/download/log?name=${name}&namespace=${namespace}&tail_lines=${100000}`);
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
                if (theme === 'github') {
                  this.setState({ theme: 'monokai' });
                } else {
                  this.setState({
                    theme: 'github',
                  });
                }
              }}
            >主题切换</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <strong>{this.state.pod.name} 日志</strong>
          </Col>
          <Col span={6}>
            <Search
              style={{ float: 'right', marginRight: 10, marginTop: 10, border: 'none' }}
              placeholder="搜索日志"
              onSearch={(value: any) => {
                this.editor.editor.find(value);
              }}
              addonAfter={<div>
                <CaretUpOutlined onClick={() => {
                  this.editor.editor.findPrevious();
                }}/>
                <CaretDownOutlined
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    this.editor.editor.findNext();
                  }}
                />
                <VerticalAlignTopOutlined
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    this.editor.editor.gotoLine(1);
                    this.editor.editor.findNext();
                  }}
                />
                <VerticalAlignBottomOutlined
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    this.editor.editor.gotoLine(
                      this.state.tail_lines,
                    );
                    this.editor.editor.findPrevious();
                  }}
                />
              </div>}
            />
          </Col>
        </Row>
      </Header>
      <Content className={styles.content}>
        <AceEditor
          ref={(ref: any) => {
            this.editor = ref;
          }}
          mode="text"
          theme={this.state.theme}
          name="log"
          value={this.state.logs.join('\n')}
          readOnly
          style={{ width: '100%', height: '100%' }}
          setOptions={{
            autoScrollEditorIntoView: true,
            wrap: true,
            showPrintMargin: false,
          }}
          fontSize={this.state.fontSize}
        />
        <div id="log"/>
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
