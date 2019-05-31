import React, { Component } from "react";
import Note from "./Note";
import { Card } from "semantic-ui-react";

class NoteGroup extends Component {
  render() {
    const { notes, itemsPerRow, tagMap, noteMap, functions } = this.props;

    return (
      <Card.Group itemsPerRow={itemsPerRow}>
        {notes.map(note => (
          <Note
            key={note}
            tagMap={tagMap}
            value={noteMap.get(note).getValue()}
            editing={noteMap.get(note).editing}
            editNote={() => functions.editNote(note)}
            changeNoteValue={(i, e) => functions.changeNoteValue(note, e.value)}
            changeNoteTags={e => functions.changeNoteTags(note, e)}
            saveNote={() => functions.saveNote(note, true)}
            cancelNote={() => functions.saveNote(note, false)}
            selectedTags={noteMap.get(note).tagUUIDs}
            deleteNote={() => functions.deleteNote(note)}
          />
        ))}
      </Card.Group>
    );
  }
}

export default NoteGroup;
