import React, { Component } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface UploaderProps {
  onChange?: any;
  fileList?: any;
}

interface UploaderState {

}

class Uploader extends Component<UploaderProps, UploaderState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    return <Upload
      name='file'
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      headers={{
        authorization: 'authorization-text',
      }}
      onChange={this.onChange}
      fileList={this.props.fileList}
    >
      <Button>
        <UploadOutlined/> Click to Upload
      </Button>
    </Upload>;
  }
}

export default Uploader;
