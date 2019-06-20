import React, { Component } from "react";
import Note from "./Note";

class NoteMenu extends Component {
  render() {
    const { functions, tagMap, notes } = this.props;

    return (
      <>
        {notes.map(([key, note]) => (
          <Note
            key={key}
            setAsActiveNote={functions.setAsActiveNote}
            UUID={note}
            tagMap={tagMap}
            note={note}
          />
        ))}
      </>
    );
  }
}

export default NoteMenu;
