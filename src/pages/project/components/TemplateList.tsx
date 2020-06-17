import { Button, message, Modal, Table, Tag } from 'antd';
import React, { Component } from 'react';

import { deleteTemplate, getTemplateById, getTemplates, saveTemplate } from '@/services/templates';
import TemplateForm from '@/pages/project/components/TemplateForm';
import { TEMPLATE_TYPES } from '@/constants/template';

interface TemplateListProps {
}

interface TemplateListState {
  visible: boolean;
  template: any;
  data: [],
  loading: boolean;
}

class TemplateList extends Component<TemplateListProps, TemplateListState> {
  form: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      template: {},
      data: [],
      loading: false,
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
    this.setState({ loading: true });
    getTemplates(null).then((response: any) => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
          visible: false,
          loading: false,
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

  deleteTemplate = (record: any) => {
    Modal.confirm({
      title: `删除${record.name}`,
      onOk: () => {
        deleteTemplate(record.id).then(response => {
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
          return <Tag
            color={TEMPLATE_TYPES[value].color}
          >{TEMPLATE_TYPES[value].name}</Tag>;
        },
      },
      {
        title: '描述',
        keyIndex: 'description',
        dataIndex: 'description',
      },
      {
        title: '作者',
        keyIndex: 'author',
        dataIndex: 'author',
      },
      {
        title: '操作',
        render: (record: any) => <>
          <Button size="small" onClick={() => this.edit(record)}>编辑</Button>
          <Button
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => this.deleteTemplate(record)}
          >删除</Button>
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
        loading={this.state.loading}
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
      </Modal>
    </>;
  }
}

export default TemplateList;
