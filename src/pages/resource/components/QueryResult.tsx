import * as React from 'react';
import { Component } from 'react';
import { Table } from 'antd';

interface QueryResultProps {
  result: any;
}

interface QueryResultState {
  data: any;
  columns: any;
}

class QueryResult extends Component<QueryResultProps, QueryResultState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      columns: [],
    };
  }

  componentDidMount(): void {

  }

  componentWillReceiveProps(nextProps: any): void {
    const { result } = nextProps;
    if (result) {
      const columns: any = [];
      // eslint-disable-next-line array-callback-return
      result.columns.map((column: any) => {
        columns.push({
          title: column,
          dataIndex: column,
          keyIndex: column,
        });
      });
      this.setState({
        columns,
        data: result.result,
      });
    }
  }

  render() {
    return <div>
      <Table
        dataSource={this.state.data}
        columns={this.state.columns}
        size="small"
        rowKey="id"
        scroll={{ x: true }}
        bordered
      />
    </div>;
  }
}

export default QueryResult;
