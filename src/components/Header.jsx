import React from "react";

import Dropdown from "./Dropdown";

import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      x: 0,
      width: props.width,
    };
  }

  render() {
    return (
      <header id="headerBar">
        <div id="logo">
          <label>Code Craft</label>
          <label id="description">A lightweight online code editor</label>
        </div>

        <div id="buttonsContainer">
          <div id="dropdownContainer">
            <Dropdown
              id="themeDropdown"
              width="155px"
              label="Theme"
              options={this.props.themeOptions}
              onSelect={this.props.onThemeChanged}
            />
            <Dropdown
              id="langDropdown"
              width="125px"
              label="Language"
              options={this.props.languageOptions}
              onSelect={this.props.onLanguageChanged}
            />
          </div>
          <button id="runButton" onClick={this.props.onRunButtonClicked}>
            Run Code
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
