import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Table, Input } from 'antd';
import { dBInstList } from '@/services/database';

interface DBInstanceProps {

}

interface DBInstanceState {
  data: any;
}

class DBInstance extends Component<DBInstanceProps, DBInstanceState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    dBInstList().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
        });
      }
    });
  }

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
        render: () => <span>删除</span>,
      },
    ];
    return <PageHeaderWrapper title={false}>
      <Button type="primary" style={{ marginBottom: 20, float: 'right' }}>添加实例</Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.state.data}
      />
    </PageHeaderWrapper>;
  }
}

export default DBInstance;
