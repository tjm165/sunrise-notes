import React, { Component } from "react";
import Tag from "./Tag";

class Tags extends Component {
  render() {
    const { tags, functions } = this.props;
    var tagIndex = 0;
    return (
      <div>
        {tags.map(t => (
          <Tag
            tag={t}
            index={tagIndex}
            key={tagIndex}
            selected={t.noteIndices[tagIndex++] > -1}
            functions={functions}
          />
        ))}
      </div>
    );
  }
}

export default Tags;
