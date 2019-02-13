import React, { Component } from "react";
import Note from "../note/Note";

class NotesOnDisplay extends Component {
  render() {
    const { functions, selectedBoard, tags, notes } = this.props;

    return (
      <div>
        <ul>
          {functions.boardGetNoteIndices(selectedBoard).map(i => (
            <Note
              tags={tags}
              note={notes[i]}
              index={i}
              key={i}
              functions={functions}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default NotesOnDisplay;
