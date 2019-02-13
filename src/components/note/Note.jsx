import React, { Component } from "react";
import Header from "./Header";
import Tags from "./Tags";

class Note extends Component {
  render() {
    const { index, functions, note, tags } = this.props;
    var tagIndex = 0;

    return (
      <li>
        <Header functions={functions} index={index} />
        <Tags
          tagIndices={note.tagIndices}
          index={index}
          functions={functions}
          tags={tags}
        />
      </li>
    );
  }
}

export default Note;
