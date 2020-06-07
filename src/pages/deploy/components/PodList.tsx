import React, { Component } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-github';

interface PodListProps {
  pods: any;
}

interface PodListState {
  visible: boolean;
  pod: any;
  log: any;
  interval: any;
}


class PodList extends Component<PodListProps, PodListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      pod: {},
      log: '',
      interval: undefined,
    };
  }

  componentDidMount(): void {
  }

  readLog = (record: any) => {
    console.log(record);
  };

  readPreviousLog = () => {
  };

  render() {
    const columns = [
      { title: 'pod', dataIndex: 'name', keyIndex: 'name' },
      { title: '宿主机', dataIndex: 'hostIP', keyIndex: 'hostIP' },
      { title: '容器ip', dataIndex: 'podIp', keyIndex: 'podIp' },
      {
        title: '状态',
        dataIndex: 'phase',
        keyIndex: 'phase',
        render: (value: any) => {
          // todo any other phase
          const colors = {
            'Pending': '#108ee9',
            'Running': '#87d068',
          };
          return <Tag color={colors[value]}>
            {value}
          </Tag>;
        },
      },
      {
        title: '启动时间',
        dataIndex: 'startTime',
        keyIndex: 'startTime',
      },
      { title: '重启', dataIndex: 'hostIP', keyIndex: 'hostIP' },
      {
        title: '操作',
        width: 150,
        render: (record: any) => <div>
          <Button size="small">重启</Button>
          <Button
            size="small"
            style={{ marginLeft: 5 }}
            onClick={() => this.readLog(record)}
          >日志</Button>
        </div>,
      },
    ];
    return <div>
      <Table
        rowKey="name"
        columns={columns}
        dataSource={this.props.pods}
        size="large"
        bordered
      />
      <Modal
        visible={this.state.visible}
        title={this.state.pod.name}
        width={1200}
        centered
        destroyOnClose
        onCancel={() => {
          const { interval } = this.state;
          clearInterval(interval);
          this.setState({
            visible: false,
            log: '',
            pod: {},
          });
        }}
        footer={<div>
          <Button onClick={this.readPreviousLog}>
            查看上一份退出日志
          </Button>
        </div>}
      >
        <AceEditor
          mode="sh"
          theme="github"
          name="log"
          value={this.state.log}
          readOnly
          style={{ width: '100%', minHeight: 600 }}
        />
        <div id="log"/>
      </Modal>
    </div>;
  }
}

export default PodList;
