import React, { Component } from "react";
import Note from "./Note";
import { Card } from "semantic-ui-react";

class NoteGroup extends Component {
  render() {
    const { notes, itemsPerRow, state, functions } = this.props;

    return (
      <Card.Group itemsPerRow={itemsPerRow}>
        {notes.map(note => (
          <Note
            tagMap={state.tagMap}
            value={state.noteMap.get(note).getValue()}
            editing={state.noteMap.get(note).editing}
            editNote={() => functions.editNote(note)}
            changeNoteValue={(i, e) => functions.changeNoteValue(note, e.value)}
            changeNoteTags={e => functions.changeNoteTags(note, e)}
            saveNote={() => functions.saveNote(note, true)}
            cancelNote={() => functions.saveNote(note, false)}
            selectedTags={() => functions.getNoteTags(note)}
            deleteNote={() => functions.deleteNote(note)}
          />
        ))}
      </Card.Group>
    );
  }
}

export default NoteGroup;
