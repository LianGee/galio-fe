import { Button, message, Modal, Table } from 'antd';
import React, { Component } from 'react';

import { getTemplateById, getTemplates, saveTemplate } from '@/services/templates';
import TemplateForm from '@/pages/project/components/TemplateForm';

interface TemplateListProps {
}

interface TemplateListState {
  visible: boolean;
  template: any;
  data: [],
}

class TemplateList extends Component<TemplateListProps, TemplateListState> {
  form: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      template: {},
      data: [],
    };
  }

  componentDidMount(): void {
    this.init();
  }

  edit = (value: any) => {
    getTemplateById(value.id).then(response => {
      this.setState({
        visible: true,
        template: {
          ...response.data,
        },
      });
    });
  };

  init = () => {
    getTemplates(null).then((response: any) => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
          visible: false,
        });
      }
    });
  };

  createTemplate = () => {
    this.setState({
      visible: true,
      template: {},
    });
  };

  render() {
    const columns = [
      {
        title: '名称',
        keyIndex: 'name',
        dataIndex: 'name',
      },
      {
        title: '类型',
        keyIndex: 'type',
        dataIndex: 'type',
        render: (value: any) => {
          const types = ['dockerfile', 'nginx', 'k8s'];
          return <span>{types[value]}</span>;
        },
      },
      {
        title: '作者',
        keyIndex: 'author',
        dataIndex: 'author',
      },
      {
        title: '操作',
        render: (value: any) => <>
          <Button size="small" onClick={() => this.edit(value)}>编辑</Button>
          <Button size="small" style={{ marginLeft: 10 }}>删除</Button>
        </>,
      },
    ];
    return <>
      <div style={{ height: 50 }}>
        <Button
          type="primary"
          onClick={this.createTemplate}
          style={{ float: 'right', marginBottom: 20 }}
        >
          新建模板
        </Button>
      </div>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={this.state.data}
      />
      <Modal
        title="编辑模板"
        visible={this.state.visible}
        width={900}
        onCancel={() => this.setState({ visible: false })}
        destroyOnClose
        centered
        onOk={() => {
          const { current } = this.form;
          current.validateFields().then((values: any) => {
            saveTemplate(values).then(response => {
              if (response.status === 0) {
                this.init();
                message.success('保存成功');
              }
            });
          }).catch(() => {
          });
        }}
      >
        <TemplateForm form={this.form} template={this.state.template}/>
        <div id="editor"/>
      </Modal>
    </>;
  }
}

export default TemplateList;
;
