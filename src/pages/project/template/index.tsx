import * as React from 'react';
import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TemplateList from '@/pages/project/components/TemplateList';

interface TemplateProps {

}

interface TemplateState {
}

class Template extends Component<TemplateProps, TemplateState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
  }

  render() {
    return <PageHeaderWrapper title={false}>
      <TemplateList/>
    </PageHeaderWrapper>;
  }
}

export default Template;
