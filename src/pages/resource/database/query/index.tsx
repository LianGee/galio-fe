import * as React from 'react';
import { Component, createRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Row } from 'antd';
import SelectDBForm from '@/pages/resource/components/SelectDBForm';
import { PlayCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { getTablesInfo, query } from '@/services/database';
import sqlFormatter from 'sql-formatter';
import MonacoEditor from 'react-monaco-editor';
import TableList from '../../components/TableList';
import QueryResult from '../../components/QueryResult';


interface QueryProps {

}

interface QueryState {
  sql: string;
  table_info: any;
  result: any;
}

class Query extends Component<QueryProps, QueryState> {
  form: any = createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      sql: '',
      table_info: [],
      result: undefined,
    };
  }

  componentDidMount(): void {
  }

  clickQuery = (table: any) => {
    this.setState({
      sql: `SELECT * FROM \`${table.table_name}\` LIMIT 500;`,
    });
  };

  getTableList = (id: any, database: any) => {
    getTablesInfo(id, database).then(response => {
      if (response.status === 0) {
        this.setState({
          table_info: response.data,
        });
      }
    });
  };

  query = () => {
    this.form.current.validateFields().then((values: any) => {
      query(
        {
          ...values,
          sql: this.state.sql,
        },
      ).then(response => {
        if (response.status === 0) {
          this.setState({
            result: response.data,
          });
        }
      });
    }).catch(() => {
    });
  };

  format = () => {
    const { sql } = this.state;
    this.setState({
      sql: sqlFormatter.format(sql),
    });
  };

  getSuggestions: any = (monaco: any) => {
    return {
      suggestions: [
        {
          label: 'select',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'select',
        },
        {
          label: 'from',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'from',
        },
      ],
    };
  };

  editorDidMount = (editor: any, monaco: any) => {
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: () => {
        return this.getSuggestions(monaco);
      },
    });
  };

  render() {
    return <PageHeaderWrapper>
      <Row style={{ backgroundColor: 'white' }}>
        <Col span={8} style={{ padding: 20 }}>
          <SelectDBForm getTableList={this.getTableList} form={this.form}/>
          <TableList data={this.state.table_info} clickQuery={this.clickQuery}/>
        </Col>
        <Col span={16}>
          <MonacoEditor
            height={300}
            theme="vs-dark"
            language="sql"
            value={this.state.sql}
            onChange={(value: any) => this.setState({ sql: value })}
            options={{
              scrollBeyondLastLine: false,
              selectOnLineNumbers: true,
              roundedSelection: false,
              cursorStyle: 'line',
              readOnly: true,
              fontSize: 16,
            }}
            editorDidMount={this.editorDidMount}
          />
          <div style={{ position: 'absolute', top: 10, right: 30 }}>
            <Button
              shape="circle"
              icon={<PlayCircleOutlined/>}
              size="small"
              type="primary"
              onClick={this.query}
            />
            <Button
              shape="circle"
              icon={<RetweetOutlined/>}
              size="small"
              type="primary"
              style={{ marginLeft: 5 }}
              onClick={this.format}
            />
          </div>
          <QueryResult result={this.state.result}/>
        </Col>
      </Row>
    </PageHeaderWrapper>;
  }
}

export default Query;
