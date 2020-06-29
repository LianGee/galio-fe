import { Select } from 'antd';
import * as React from 'react';
import { Component } from 'react';
import { listProjectImage } from '@/services/harbor';

const { Option } = Select;

interface ImageSelectProps {
  onChange?: any;
  value?: any;
  project_id: any;
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
      loading: false,
    };
  }

  componentDidMount(): void {
    if (this.props.project_id) {
      this.init(this.props.project_id);
    }
  }

  componentWillReceiveProps(nextProps: any): void {
    if (this.props.project_id !== nextProps.project_id) {
      this.init(nextProps.project_id);
    }
  }

  init = (project_id: any) => {
    this.setState({ loading: true });
    listProjectImage(project_id).then(response => {
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

export default ImageSelect;
