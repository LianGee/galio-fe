import React, { Component, createRef } from 'react';
import { Button, message, Modal, Table } from 'antd';
import { listHost, saveHost } from '@/services/host';
import HostForm from '@/pages/resource/components/HostForm';

interface HostManagerProps {

}

interface HostManagerState {
  data: any;
  visible: boolean;
  loading: boolean;
  initialValues: any;
}

class HostManager extends Component<HostManagerProps, HostManagerState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      loading: false,
      initialValues: {},
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    this.setState({ loading: true });
    listHost().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
          loading: false,
        });
      }
    });
  };

  addHost = () => {
    this.setState({ visible: true });
  };

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
      { title: '公网ip', dataIndex: 'public_ip', keyIndex: 'public_ip' },
      { title: '内网ip', dataIndex: 'internal_ip', keyIndex: 'internal_ip' },
      {
        title: '操作',
        render: (record: any) =>
          <div>
            <Button
              size="small"
              onClick={() => {
                this.setState({ visible: true, initialValues: record });
              }}
            >修改</Button>
          </div>,
      },
    ];
    return <div>
      <Button
        type="primary"
        style={{ marginBottom: 20, float: 'right', zIndex: 9 }}
        onClick={this.addHost}
      >
        添加主机
      </Button>
      <Table
        columns={columns}
        dataSource={this.state.data}
        loading={this.state.loading}
        rowKey="id"
      />
      <Modal
        destroyOnClose
        title="添加主机"
        visible={this.state.visible}
        onCancel={() => this.setState({ visible: false })}
        onOk={() => {
          this.form.current.validateFields().then((values: any) => {
            saveHost(values).then(response => {
              if (response.status === 0) {
                this.setState({ visible: false });
                message.success('保存成功');
                this.init();
              }
            });
          }).catch(() => {
          });
        }}
      >
        <HostForm form={this.form} initialValues={this.state.initialValues}/>
      </Modal>
    </div>;
  }
}

export default HostManager;
