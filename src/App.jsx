import React from 'react';
import './App.css';
import './components/Resizer.css';

import SplitPane from 'react-split-pane';

// import AceEditor from 'react-ace';
import Header from './components/Header';
import OutputPanel from './components/OutputPanel';
import { CodeExecutionResult, executeCode } from './services/codeExecution';

// import ace editor features
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import "react-ace-builds/webpack-resolver-min";
import AceEditor from "react-ace-builds";

// import the languages
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";

// import the themes
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_dark";

const themeOptions = [
  { value: 'ambiance', label: 'Ambiance' },
  { value: 'chaos', label: 'Chaos' },
  { value: 'chrome', label: 'Chrome' },
  { value: 'clouds', label: 'Clouds' },
  { value: 'clouds_midnight', label: 'Clouds Midnight' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'eclipse', label: 'Eclipse' },
  { value: 'github', label: 'Github' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'one_dark', label: 'One Dark' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'solarized_dark', label: 'Solarized Dark' }
];

const languageOptions = [
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'Javascript' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' }
];

const languageValueToAceLanguage = {
  c: 'c_cpp',
  csharp: 'csharp',
  cpp: 'c_cpp',
  java: 'java',
  javascript: 'javascript',
  python: 'python',
  ruby: 'ruby'
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      language: 'c',
      aceLanguage: 'c_cpp',
      theme: 'ambiance',
      code: '',
      output: ''
    };
  }

  onLanguageChanged = (language) => {
    this.setState(
      { language: language, aceLanguage: languageValueToAceLanguage[language] }
    );
  }

  onThemeChanged = (theme) => {
    this.setState({ theme: theme });
  }

  onEdit = (newValue) => {
    this.setState({ code: newValue });
  }

  onRunButtonClicked = async () => {
    const result = await executeCode(this.state.language, this.state.code);
    if (result == null) {
      console.log('something went wrong');
      return;
    }

    const outputStr = (result.exitCode == 0) ? result.stdout : result.stderr;
    this.setState({ output: outputStr});
  }

  render() {
    const paneChildStyle = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div id="App">
        {/*Header bar on top of the screen*/}
        <Header themeOptions={themeOptions}
                languageOptions={languageOptions}
                onLanguageChanged={this.onLanguageChanged}
                onThemeChanged={this.onThemeChanged}
                onRunButtonClicked={this.onRunButtonClicked}/>

        {/*Containing the code editor and the output panel*/}
        <SplitPane id="workspace"
                   split='vertical'
                   minSize={200}
                   defaultSize={'70vw'} >
          <div style={paneChildStyle}>
            <AceEditor  mode={this.state.aceLanguage}
                        theme={this.state.theme}
                        value={this.state.code}
                        onChange={this.onEdit}
                        width='100%'
                        height='100%'
                        fontSize={16}
                        setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: true,
                          showLineNumbers: true,
                          showGutter: true
                        }}/>
          </div>
          <div style={{...paneChildStyle}}>
            <OutputPanel  id="outputPanel"
                          theme={this.state.theme}
                          height='100%'
                          width='100%'
                          value={this.state.output} />
          </div>
        </SplitPane>

      </div>
    );
  }
}

export default App;
