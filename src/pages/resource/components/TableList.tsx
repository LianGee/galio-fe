import * as React from 'react';
import { Component } from 'react';
import { Collapse, List, Popover } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface TableListProps {
  clickQuery: any;
  data: any;
}

interface TableListState {
}

class TableList extends Component<TableListProps, TableListState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
  }

  clickQuery = (event: any, table: any) => {
    event.stopPropagation();
    this.props.clickQuery(table);
  };

  render() {
    return <Collapse defaultActiveKey={['0']}>
      {
        this.props.data.map((table: any) => (
          <Panel
            header={
              <strong>{table.table_name}</strong>
            }
            extra={
              <ArrowRightOutlined onClick={(event) => this.clickQuery(event, table)}/>
            }
            key={table.id}
          >
            <List
              rowKey="id"
              bordered
              dataSource={table.columns}
              renderItem={(item: any) => (
                <List.Item>
                  <Popover
                    content={
                      <div>
                        <span>注释: {item.column_comment}</span><br/>
                        <span>默认值: {item.column_default}</span><br/>
                        <span>可为空: {item.is_nullable}</span><br/>
                      </div>
                    }
                    title={null}
                  >
                    <div>
                      <strong>{item.column_name}</strong>
                      <span style={{ marginLeft: 10, color: 'mediumvioletred' }}>
                        {item.column_type}  {item.extra}
                      </span>
                    </div>
                  </Popover>
                </List.Item>
              )}
            />
          </Panel>
        ))
      }
    </Collapse>;
  }
}

export default TableList;
