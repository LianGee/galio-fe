import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DomainManager from '@/pages/resource/components/DomainManager';
import HostManager from '@/pages/resource/components/HostManager';


interface CloudProps {

}

interface CloudState {
}

class Cloud extends Component<CloudProps, CloudState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {

  }

  render() {
    return <PageHeaderWrapper title={false}>
      <HostManager/>
      <DomainManager/>
    </PageHeaderWrapper>;
  }
}

export default Cloud;
