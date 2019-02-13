import React, { Component } from "react";

class Tag extends Component {
  render() {
    const { tag, index, functions } = this.props;
    const value = tag.value;
    const selected = tag.selected;

    return (
      <div>
        <input
          onChange={() => functions.tagSelect(index)}
          type="checkbox"
          id={"tag" + index}
        />
        <label for={"tag" + index}>
          <input
            type="text"
            index={index}
            value={value}
            onChange={functions.tagSetValue}
          />
        </label>
      </div>
    );
  }
}

export default Tag;
