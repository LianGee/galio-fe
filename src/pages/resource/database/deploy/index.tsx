import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

interface DBDeployProps {

}

interface DBDeployState {
  data: any;
  editor: any;
}

class DBDeploy extends Component<DBDeployProps, DBDeployState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: undefined,
      editor: undefined,
    };
  }

  componentDidMount(): void {
  }

  componentWillUnmount(): void {
    if (this.state.editor) {
      this.state.editor.dispose();
    }
  }

  getSuggestions: any = (monaco: any) => {
    return {
      suggestions: [
        {
          label: 'select',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'select',
        },
        {
          label: 'from',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'from',
        },
      ],
    };
  };

  editorDidMount = (editor: any, monaco: any) => {
    const monacoEditor = monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: () => {
        return this.getSuggestions(monaco);
      },
    });
    this.setState({ editor: monacoEditor });
  };

  render() {
    return <>
      <MonacoEditor
        height={400}
        theme="vs-dark"
        language="sql"
        defaultValue={this.state.data}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
        }}
        onChange={(value: any) => this.setState({ data: value })}
        editorDidMount={this.editorDidMount}
      />
    </>;
  }
}

export default DBDeploy;
