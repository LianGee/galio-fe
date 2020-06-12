import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-github';
import io from 'socket.io-client';
import { getPageQuery } from '@/utils/utils';
import { PageHeader } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.less';

interface LogProps {

}

interface LogState {
  log: any;
  loading: boolean;
  pod: any;
}

const socket = io('http://127.0.0.1:8010/galio/deploy');

class Log extends Component<LogProps, LogState> {
  editor: any;

  constructor(props: any) {
    super(props);
    this.state = {
      log: '',
      loading: false,
      pod: {},
    };
  }

  componentDidMount(): void {
    const pod = getPageQuery();
    this.setState({ loading: true, pod });
    socket.connect();
    socket.emit('log', { ...pod });
    socket.on('log', (data: any) => {
      this.setState({ log: data, loading: false });
      const session = this.editor.editor.getSession();
      this.editor.editor.gotoLine(
        session.getLength(),
      );
    });
  }

  componentWillUnmount(): void {
    socket.close();
  }

  render() {
    return <>
      <PageHeader
        title={this.state.pod.name}
      />
      <AceEditor
        ref={(ref: any) => {
          this.editor = ref;
        }}
        mode="sh"
        theme="github"
        name="log"
        value={this.state.log}
        readOnly
        style={{ width: '100%', minHeight: '100%' }}
        setOptions={{
          autoScrollEditorIntoView: true,
        }}
      />
      <div id="log"/>
      <div className={styles.shadow} style={{ display: this.state.loading ? 'block' : 'none' }}>
        <div style={{ marginTop: 200, textAlign: 'center' }}>
          <SyncOutlined spin/>
          <span>加载中,请稍后...</span>
        </div>
      </div>
    </>;
  }
}

export default Log;
