import React, { Component } from "react";
import ToggleTag from "./ToggleTag";

class Tags extends Component {
  render() {
    const { tagIndices, functions, index, tags } = this.props;

    return (
      <div>
        #
        {tagIndices.map(t => (
          <span key={t}> {t}</span>
        ))}
        <ToggleTag index={index} functions={functions} tags={tags} />
      </div>
    );
  }
}

export default Tags;
