import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as React from 'react';
import ProjectList from '@/pages/project/components/ProjectList';

class Project extends Component {
  render() {
    return <PageHeaderWrapper>
      <ProjectList/>
    </PageHeaderWrapper>
  }
}

export default Project;
