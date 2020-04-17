import { Form } from 'antd';
import * as React from 'react';
import { Component } from 'react';
import InstSelect from '@/pages/resource/components/InstSelect';
import DBSelect from '@/pages/resource/components/DBSelect';
import { getDatabase } from '@/services/database';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

interface SelectDBFormProps {
  getTableList: any;
  form: any;
}

interface SelectDBFormState {
  data: any;
}

class SelectDBForm extends Component<SelectDBFormProps, SelectDBFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  onChange = (value: any) => {
    if (value) {
      getDatabase(value).then(response => {
        if (response.status === 0) {
          this.setState({ data: response.data });
        }
      });
    } else {
      this.setState({ data: [] });
    }
  };

  onValuesChange = (changedValues: any, allValues: any) => {
    const { id, database } = allValues;
    if (id && database) {
      this.props.getTableList(id, database);
    }
  };

  render() {
    return <Form
      {...layout}
      onValuesChange={this.onValuesChange}
      ref={this.props.form}
    >
      <Form.Item label="实例" name="id" required>
        <InstSelect onChange={this.onChange}/>
      </Form.Item>
      <Form.Item
        label="数据库"
        name="database"
        required
      >
        <DBSelect data={this.state.data}/>
      </Form.Item>
    </Form>;
  }
}

export default SelectDBForm;
