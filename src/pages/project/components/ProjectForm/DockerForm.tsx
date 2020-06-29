import React, { Component } from 'react';
import { Form } from 'antd';
import DckTypeSelect from '@/pages/project/components/ProjectForm/DckTypeSelect';
import TemplateSelect from '@/pages/project/components/ProjectForm/TemplateSelect';
import { TEMPLATE_TYPE } from '@/constants/template';
import BaseImageSelect from '@/pages/project/components/ProjectForm/BaseImageSelect';
import NginxProxy from '@/pages/project/components/ProjectForm/NginxProxy';

interface DockerFormProps {
  layout: any;
  layoutWithoutLabel: any;
  initialValues: any;
  formRef: any;
}

interface DockerFormState {
  dockerfileType: number;
}

class DockerForm extends Component<DockerFormProps, DockerFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dockerfileType: props.initialValues.dockerfile_type,
    };
  }

  onValuesChange = (changedValues: any) => {
    const { dockerfile_type } = changedValues;
    if (dockerfile_type !== undefined) {
      this.setState({
        dockerfileType: dockerfile_type,
      });
    }
  };

  render() {
    return <Form
      {...this.props.layout}
      initialValues={this.props.initialValues || {}}
      onValuesChange={this.onValuesChange}
      ref={this.props.formRef}
    >
      <Form.Item
        label="dockerfile类型"
        name="dockerfile_type"
        rules={[{ required: true, message: '请选择dockerfile类型' }]}
      >
        <DckTypeSelect/>
      </Form.Item>
      {
        this.state.dockerfileType === 1 ?
          <>
            <Form.Item
              label="dockerfile 模板"
              name="docker_template_id"
              extra="需要使用docker方式构建的项目"
              rules={[{ required: true, message: '请选择docker模板' }]}
            >
              <TemplateSelect type={TEMPLATE_TYPE.DOCKERFILE}/>
            </Form.Item>
            <Form.Item
              label="基镜像"
              name="base_image"
              extra="前端项目仅支持nginx部署"
              rules={[{ required: true, message: '请选择基础镜像' }]}
            >
              <BaseImageSelect/>
            </Form.Item>
            <Form.Item
              label="nginx 模板"
              name="nginx_template_id"
              extra="需要使用nginx方式构建的项目"
            >
              <TemplateSelect type={TEMPLATE_TYPE.NGINX}/>
            </Form.Item>
            <Form.List
              name="nginx_proxies"
            >
              {
                (fields: any, { add, remove }) => {
                  return <NginxProxy
                    fields={fields}
                    add={add}
                    remove={remove}
                    layoutWithoutLabel={this.props.layoutWithoutLabel}
                    layout={this.props.layout}
                  />;
                }
              }
            </Form.List>
          </> : null
      }
    </Form>;
  }
}

export default DockerForm;
