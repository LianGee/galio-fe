import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-nginx';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { preview } from '@/services/templates';
import ProjectSelect from '@/pages/build/components/ProjectSelect';

interface TemplateEditorProps {
  mode: string;
  value?: string;
  onChange?: any;
}

interface TemplateEditorState {
  previewing: boolean;
  content: any;
  project_id: any;
  loading: boolean;
}

class TemplateEditor extends Component<TemplateEditorProps, TemplateEditorState> {
  editor: any;

  constructor(props: any) {
    super(props);
    this.state = {
      previewing: false,
      content: props.value,
      project_id: undefined,
      loading: false,
    };
  }

  onPreview = () => {
    this.setState({ previewing: true, loading: true });
    preview({
      content: this.props.value,
      project_id: this.state.project_id,
    }).then(response => {
      this.setState({ content: this.props.value, loading: false });
      this.editor.editor.setValue(response.data);
    });
  };

  onEdit = () => {
    this.setState({ previewing: false });
    this.editor.editor.setValue(this.state.content);
  };

  selectProject = (value: any) => {
    this.setState({ project_id: value });
  };

  render() {
    return <>
      <AceEditor
        ref={(ref: any) => {
          this.editor = ref;
        }}
        mode={this.props.mode}
        theme="monokai"
        name="template-editor"
        style={{ width: '100%' }}
        value={this.props.value}
        onChange={this.props.onChange}
        readOnly={this.state.previewing}
      />
      <div id="template-editor"/>
      <div style={{ position: 'absolute', zIndex: 9999, top: 20, right: 40 }}>
        <Row style={{ width: 200 }}>
          <Col span={20} style={{ marginRight: 5 }}>
            <ProjectSelect value={this.state.project_id} onChange={this.selectProject}/>
          </Col>
          <Col span={3}>
            {
              this.state.previewing ?
                <Button
                  icon={<EyeInvisibleOutlined/>}
                  shape="circle"
                  ghost
                  onClick={this.onEdit}
                  loading={this.state.loading}
                /> :
                <Button
                  icon={<EyeOutlined/>}
                  shape="circle"
                  ghost
                  onClick={this.onPreview}
                  loading={this.state.loading}
                />
            }
          </Col>
        </Row>
      </div>
    </>;
  }
}

export default TemplateEditor;
