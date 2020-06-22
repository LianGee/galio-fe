import * as React from 'react';
import { Component, createRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { dBInstList, saveDBInst, deleteDBInst } from '@/services/database';

interface DBInstanceProps {

}

interface DBInstanceState {
  data: any;
  visible: boolean;
}

class DBInstance extends Component<DBInstanceProps, DBInstanceState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      visible: false,
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    dBInstList().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
        });
      }
    });
  };

  addInst = () => {
    this.setState({
      visible: true,
    });
  };

  deleteInst = (record: any) => {
    Modal.confirm({
      title: `确认删除实例${record.ip}`,
      onOk: () => {
        deleteDBInst(record.id).then(response => {
          if (response.status === 0) {
            this.init();
            message.success('删除成功');
          }
        });
      },
    });
  };

  render() {
    const columns = [
      { title: 'ip', dataIndex: 'ip', keyIndex: 'ip' },
      { title: '端口', dataIndex: 'port', keyIndex: 'port' },
      { title: '用户名', dataIndex: 'user_name', keyIndex: 'user_name' },
      {
        title: '密码',
        dataIndex: 'password',
        keyIndex: 'password',
        render: (value: any) => (
          <Input.Password
            size="large"
            defaultValue={value}
            style={{ border: 'none' }}
          />
        ),
      },
      {
        title: '操作',
        render: (record: any) => <Button
          size="small"
          onClick={() => this.deleteInst(record)}
        >删除</Button>,
      },
    ];
    return <PageHeaderWrapper>
      <Button
        type="primary"
        style={{ marginBottom: 20, float: 'right', zIndex: 10 }}
        onClick={this.addInst}
      >添加实例</Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.state.data}
      />
      <Modal
        title="添加实例"
        visible={this.state.visible}
        destroyOnClose
        onOk={() => {
          this.form.current.validateFields().then((values: any) => {
            saveDBInst(values).then(response => {
              if (response.status === 0) {
                message.success('保存成功');
                this.setState({ visible: false });
                this.init();
              }
            });
          }).catch(() => {
          });
        }}
        onCancel={() => this.setState({ visible: false })}
      >
        <Form
          initialValues={{
            port: 3306,
            user_name: 123456,
          }}
          name="form_in_modal"
          ref={this.form}
        >
          <Form.Item
            label="ip"
            name="ip"
            rules={[
              { required: true, message: '请填写ip' },
              {
                pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
                message: 'ip地址不规范',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="端口"
            name="port"
            required
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="user_name"
            required
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            required
          >
            <Input.Password/>
          </Form.Item>
        </Form>
      </Modal>
    </PageHeaderWrapper>;
  }
}

export default DBInstance;
