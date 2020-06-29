import { Select } from 'antd';
import * as React from 'react';
import { Component } from 'react';
import { listBaseImage } from '@/services/harbor';

const { Option } = Select;

interface BaseImageSelectProps {
  onChange?: any;
  value?: any;
}

interface BaseImageSelectState {
  images: any;
  loading: boolean;
}

class BaseImageSelect extends Component<BaseImageSelectProps, BaseImageSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      loading: false,
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    this.setState({ loading: true });
    listBaseImage().then(response => {
      if (response.status === 0) {
        this.setState({
          loading: false,
          images: response.data,
        });
      }
    });
  };

  render() {
    return <Select
      loading={this.state.loading}
      onChange={this.props.onChange}
      value={this.props.value}
    >
      {
        this.state.images.map((image: any) => (
          <Option key={image.digest} value={image.name}>{image.name}</Option>
        ))
      }
    </Select>;
  }
}

export default BaseImageSelect;
