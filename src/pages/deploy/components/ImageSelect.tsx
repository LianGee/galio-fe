import { Select } from 'antd';
import * as React from 'react';
import { Component } from 'react';
import { listImage } from '@/services/docker';

const { Option } = Select;

interface ImageSelectProps {
  onChange?: any;
  value?: any;
}

interface ImageSelectState {
  images: any;
  loading: boolean;
}

class ImageSelect extends Component<ImageSelectProps, ImageSelectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      loading: true,
    };
  }

  componentDidMount(): void {
    listImage().then(response => {
      if (response.status === 0) {
        this.setState({
          loading: false,
          images: response.data,
        });
      }
    });
  }

  render() {
    return <Select
      loading={this.state.loading}
      onChange={this.props.onChange}
      value={this.props.value}
    >
      {
        this.state.images.map((image: any) => (
          <Option key={image.id} value={image.name}>{image.name}</Option>
        ))
      }
    </Select>;
  }
}

export default ImageSelect;
