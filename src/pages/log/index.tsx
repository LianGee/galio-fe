import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import io from 'socket.io-client';
import { getPageQuery } from '@/utils/utils';
import { Button, Col, Input, InputNumber, Layout, Row, Switch } from 'antd';
import styles from './index.less';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons/lib';

interface LogProps {

}

interface LogState {
  log: any;
  pod: any;
  theme: 'monokai' | 'github';
  fontSize: number;
  tail_lines: number;
}

const socket = io('http://127.0.0.1:8010/galio/deploy');

const { Header, Footer, Content } = Layout;

const { Search } = Input;

class Log extends Component<LogProps, LogState> {
  editor: any;

  constructor(props: any) {
    super(props);
    this.state = {
      log: '',
      pod: getPageQuery(),
      theme: 'github',
      fontSize: 12,
      tail_lines: 500,
    };
  }

  componentDidMount(): void {
    const { pod } = this.state;
    socket.connect();
    socket.emit('log', { ...pod });
    socket.on('log', (data: any) => {
      this.setState({ log: data });
      this.scrollToBottom();
    });
  }

  componentWillUnmount(): void {
    socket.close();
  }

  scrollToBottom = () => {
    const session = this.editor.editor.getSession();
    this.editor.editor.gotoLine(
      session.getLength(),
    );
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
                    this.scrollToBottom();
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
          mode="html"
          theme={this.state.theme}
          name="log"
          value={this.state.log}
          readOnly
          style={{ width: '100%', height: '100%' }}
          setOptions={{
            autoScrollEditorIntoView: true,
          }}
          fontSize={this.state.fontSize}
        />
        <div id="log"/>
      </Content>
      <Footer className={styles.footer}>
        行数
        <InputNumber
          value={this.state.tail_lines}
          onChange={(value: any) => this.setState({ tail_lines: value })}
          step={500}
          max={500000}
          min={500}
          style={{ marginLeft: 10 }}
        />
        <Switch
          style={{ marginLeft: 10 }}
          checkedChildren="开启追踪"
          unCheckedChildren="关闭追踪"
          defaultChecked
        />
      </Footer>
    </Layout>;
  }
}

export default Log;
