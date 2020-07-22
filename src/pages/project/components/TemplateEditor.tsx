import React, { Component } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { preview } from '@/services/templates';
import ProjectSelect from '@/pages/build/components/ProjectSelect';
import MonacoEditor from 'react-monaco-editor';

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
      this.editor.setValue(response.data);
    });
  };

  onEdit = () => {
    this.setState({ previewing: false });
    this.editor.setValue(this.state.content);
  };

  selectProject = (value: any) => {
    this.setState({ project_id: value });
  };

  editorDidMount = (editor: any) => {
    this.editor = editor;
  };

  render() {
    return <>
      <MonacoEditor
        height={400}
        width="100%"
        theme="vs-dark"
        language={this.props.mode}
        defaultValue={this.props.value}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          readOnly: this.state.previewing,
        }}
        onChange={this.props.onChange}
        editorDidMount={this.editorDidMount}
      />
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
