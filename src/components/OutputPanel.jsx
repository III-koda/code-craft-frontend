import React from 'react'

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import "react-ace-builds/webpack-resolver-min";
import AceEditor from "react-ace-builds";

import "ace-builds/src-noconflict/mode-text";

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


class OutputPanel extends React.Component {

    constructor(props) {
        super();
        this.props = props
        this.state = {
            x: 0,
            width: props.width
        };
    }

    render() {
        const wrapperStyle = {
            width: this.props.width,
            height: this.props.height
        };
        return (
            <div style={wrapperStyle}>
                <AceEditor mode="text"
                           theme={this.props.theme}
                           fontSize={15}
                           value={this.props.value}
                           readOnly={true}
                           showPrintMargin={false}
                           highlightActiveLine={false}
                           showGutter={false}
                           height='100%'
                           width='100%'
                           style={{fontFamily: 'monospace'}} />
            </div>
        );
    }
}

export default OutputPanel;
