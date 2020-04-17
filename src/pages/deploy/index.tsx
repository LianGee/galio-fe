import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DeployForm from '@/pages/deploy/components/DeployForm';

class Deploy extends Component {
  render() {
    return <PageHeaderWrapper title={false}>
      <DeployForm/>
    </PageHeaderWrapper>;
  }
}

export default Deploy;
