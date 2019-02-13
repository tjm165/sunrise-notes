import React, { Component } from "react";

class ToggleTag extends Component {
  render() {
    const { functions, index, tags } = this.props;
    var tagIndex = 0;

    return (
      <div>
        Toggle Tag:
        <select
          index={index}
          value={functions.noteGetToggleTag(index)}
          onChange={functions.noteSetToggleTag}
        >
          {tags.map(t => (
            <option value={tagIndex++}>{t.value}</option>
          ))}
        </select>
        <button onClick={() => functions.noteToggleTag(index)}>
          Toggle this tag
        </button>
      </div>
    );
  }
}

export default ToggleTag;
