import React, { Component, createRef } from 'react';
import { listDomain, saveDomain } from '@/services/domain';
import { Button, message, Modal, Table } from 'antd';
import DomainForm from '@/pages/resource/components/DomainForm';

interface DomainManagerProps {

}

interface DomainManagerState {
  domains: any;
  visible: boolean;
  initialValue: any;
  loading: boolean;
}


class DomainManager extends Component<DomainManagerProps, DomainManagerState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      domains: [],
      visible: false,
      initialValue: {
        ssl: false,
      },
      loading: false,
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    this.setState({ loading: true });
    listDomain().then(response => {
      if (response.status === 0) {
        this.setState({
          domains: response.data,
          loading: false,
        });
      }
    });
  };

  render() {
    const columns = [
      { title: '域名', dataIndex: 'domain' },
      {
        title: '解析主机',
        dataIndex: 'host',
        render: (value: any) => (
          <span>{value.public_ip}</span>
        ),
      },
      { title: '监听端口', dataIndex: 'port' },
      {
        title: 'https',
        dataIndex: 'https',
        render: (value: any) => value === true ? 'on' : 'off',
      },
      {
        title: 'ip解析',
        dataIndex: 'addr_info',
        render: (value: any) => value.length > 0 ?
          value.map((ip: any) => <div key={ip}><span>{ip}</span><br/></div>)
          :
          <strong style={{ color: 'red' }}>请到主机上添加解析记录</strong>
        ,
      },
    ];
    return <div>
      <Button
        type="primary"
        style={{ float: 'right', zIndex: 1, marginBottom: 20 }}
        onClick={() => this.setState({ visible: true })}
      >
        添加域名解析
      </Button>
      <Table
        columns={columns}
        dataSource={this.state.domains}
        loading={this.state.loading}
        rowKey="id"
      />
      <Modal
        destroyOnClose
        title="添加域名解析"
        visible={this.state.visible}
        onCancel={() => this.setState({ visible: false })}
        width={600}
        onOk={() => {
          this.form.current.validateFields().then((values: any) => {
            saveDomain(values).then(response => {
              if (response.status === 0) {
                this.setState({ visible: false });
                message.success('保存成功');
                this.init();
              }
            });
          }).catch((info: any) => {
            console.log(info);
          });
        }}
      >
        <DomainForm form={this.form} initialValues={this.state.initialValue}/>
      </Modal>
    </div>;
  }
}

export default DomainManager;
