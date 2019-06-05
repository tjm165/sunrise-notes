import React, { Component } from "react";
import Note from "./Note";
import { Card } from "semantic-ui-react";

class NoteGroup extends Component {
  render() {
    const {
      selectNoteToEdit,
      notes,
      itemsPerRow,
      tagMap,
      noteMap
    } = this.props;

    return (
      <Card.Group itemsPerRow={itemsPerRow}>
        {notes.map(note => (
          <Note
            key={note}
            edit={selectNoteToEdit}
            UUID={note}
            tagMap={tagMap}
            note={noteMap.get(note)}
          />
        ))}
      </Card.Group>
    );
  }
}

export default NoteGroup;
