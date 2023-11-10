import React from 'react';
import './App.css';

import Header from './components/Header';
import OutputPanel from './components/OutputPanel';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';

// import the languages
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-php";
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
  { value: 'c_cpp', label: 'C++' },
  { value: 'python', label: 'Python' },
];

let opwidth = 35;
let outputWidth = `${opwidth}vw`

let x;
let w;
let outputPanel;


const mouseMoveHandler = function(e) {
  // distance the mouse has moved
  let dx = e.clientX - x;
  // adjust the dimensions of the element
  opwidth = `${w - dx}px`;
}


const mouseUpHandler = function() {
  // remove the handler of 'mousemove' and 'mouseup'
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
}


const dragHandler = function(e) {
  // get mouse x position
  let x = e.clientX;
  console.log(x);

  w = parseInt(opwidth, 10);

  // attach the listenser to document
  document.getElementById("outputPanel").addEventListener('mousemove', mouseMoveHandler);
  document.getElementById("outputPanel").addEventListener('mouseup', mouseUpHandler);
}


const createOutputPanel = function() {
  outputPanel = (
    <OutputPanel  id="outputPanel" width={opwidth}
                      dragHandler={dragHandler}>
      <div id="output">Output:</div>
    </OutputPanel>
  );
}


class App extends React.Component {
  constructor() {
    super();
    // set the initial state
    this.state = {
      language: 'c_cpp',
      theme: 'ambiance',
    };
  }

  onLanguageChanged = (language) => {
    this.setState({ language: language });
  }

  onThemeChanged = (theme) => {
    this.setState({ theme: theme });
  }

  async onRunButtonClicked() {
    try {
      
    }
    catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        alert(errMsg);
      }
      else {
        
      }
    }
  }

  render() {
    createOutputPanel();

    return (
      <div id="App">
        {/*Header bar on top of the screen*/}
        <Header themeOptions={themeOptions}
                languageOptions={languageOptions}
                onLanguageChanged={this.onLanguageChanged}
                onThemeChanged={this.onThemeChanged}
                onRunButtonClicked={this.onRunButtonClicked}/>

        {/*Containing the code editor and the output panel*/}
        <div id="workspace">
          <AceEditor  mode={this.state.language}
                      theme={this.state.theme}
                      width={`${100-opwidth}vw`}
                      height='100%' fontSize={15}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                        showGutter: true
                      }}/>
          {outputPanel}
        </div>

      </div>
    );
  }
}

export default App;
