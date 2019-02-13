import React, { Component } from "react";

class Header extends Component {
  render() {
    const { functions, index } = this.props;

    return (
      <div>
        Value:
        <input
          type="text"
          value={functions.noteGetValue(index)}
          onChange={functions.noteSetValue}
          index={index}
        />
      </div>
    );
  }
}

export default Header;
