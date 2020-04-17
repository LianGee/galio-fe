import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as React from 'react';
import { Table } from 'antd';

class Cloud extends Component {
  componentDidMount(): void {
  }

  render() {
    const columns = [
      { title: '集群', dataIndex: 'group', keyIndex: 'group' },
      { title: '名称', dataIndex: 'name', keyIndex: 'name' },
      { title: 'ip', dataIndex: 'ip', keyIndex: 'ip' },
    ];
    return <PageHeaderWrapper title={false}>
      <Table
        columns={columns}
        dataSource={[]}
      />
    </PageHeaderWrapper>;
  }
}

export default Cloud;
