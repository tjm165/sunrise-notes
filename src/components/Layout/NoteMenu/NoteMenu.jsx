import React, { Component } from "react";
import Note from "./Note";

class NoteMenu extends Component {
  render() {
    const { functions, tagMap, noteMap, notes } = this.props;

    return (
      <>
        {notes.map(note => (
          <Note
            key={note}
            setAsActiveNote={functions.setAsActiveNote}
            UUID={note}
            tagMap={tagMap}
            note={noteMap.get(note)}
          />
        ))}
      </>
    );
  }
}

export default NoteMenu;
