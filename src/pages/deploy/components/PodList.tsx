import React, { Component } from 'react';
import { Badge, Button, Modal, Table, Tag } from 'antd';
import * as moment from 'moment';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-github';
import { readLogOfPod } from '@/services/deploy';

interface PodListProps {
  podStatuses: any;
  loading: any;
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
    const interval = setInterval(() => {
      readLogOfPod({
        ...record,
        previous: false,
      }).then(response => {
        if (response.status === 0) {
          this.setState({
            log: response.data,
          });
        }
      });
    }, 1000);
    this.setState({
      visible: true,
      pod: record,
      interval,
    });
  };

  readPreviousLog = () => {
    const { pod } = this.state;
    readLogOfPod({
      ...pod,
      previous: true,
    }).then(response => {
      if (response.status === 0) {
        this.setState({
          log: response.data,
        });
      }
    });
  };

  render() {
    const eventColumns = [
      {
        title: '时间',
        dataIndex: 'created_at',
        keyIndex: 'created_at',
        render: (value: any) => <span>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '类型',
        dataIndex: 'type',
        keyIndex: 'type',
        width: 100,
        render: (value: any) => {
          return <Badge
            status={value === 'Warning' ? 'error' : 'success'}
            text={value}
          />;
        },
      },
      {
        title: '理由',
        dataIndex: 'reason',
        keyIndex: 'reason',
        render: (value: any, record: any) => {
          return <Tag color={record.type === 'Warning' ? '#f50' : '#87d068'}>
            {value}
          </Tag>;
        },
      },
      {
        title: '消息',
        dataIndex: 'message',
        keyIndex: 'message',
        render: (value: any, record: any) => {
          return <span style={{ color: record.type === 'Warning' ? '#f50' : '#87d068' }}>
            {value}
          </span>;
        },
      },
    ];
    const columns = [
      { title: 'pod', dataIndex: 'name', keyIndex: 'name' },
      { title: '宿主机', dataIndex: 'host_ip', keyIndex: 'host_ip' },
      { title: '容器ip', dataIndex: 'pod_ip', keyIndex: 'pod_ip' },
      {
        title: '状态',
        dataIndex: 'phase',
        keyIndex: 'phase',
        render: (value: any, record: any) => (
          <Tag color={
            record.events && record.events.filter(
              (item: any) => item.type === 'Warning',
            ).length > 0 ?
              '#f50' : '#87d068'
          }>
            {value}
          </Tag>
        ),
      },
      {
        title: '启动时间',
        dataIndex: 'start_time',
        keyIndex: 'start_time',
        render: (value: any) => <span>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      { title: '重启', dataIndex: 'restart_count', keyIndex: 'restart_count' },
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
        rowKey="uid"
        columns={columns}
        dataSource={this.props.podStatuses}
        size="large"
        bordered
        loading={this.props.loading}
        expandable={{
          expandedRowRender: (record: any) => (
            <Table
              showHeader={false}
              columns={eventColumns}
              dataSource={record.events}
              pagination={false}
              rowKey="name"
              bordered={false}
              size="small"
            />
          ),
        }}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
        }}
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
