import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import NoteGroup from "./NoteGroup";
import Note from "./Note";

class DeskNotes extends Component {
  render() {
    const { state, functions } = this.props;
    const notes = Array.from(state.contextNoteSet);
    const size = notes.length;
    const top3 = notes.slice(0, 3);
    const next4 = notes.slice(2, 7);
    const rest = notes.slice(6, size - 6);
    const newNoteKey = -1;

    return (
      <Container>
        <Note
          tagMap={state.tagMap}
          value={state.noteMap.get(newNoteKey).getValue()}
          editing={state.noteMap.get(newNoteKey).editing}
          editNote={() => functions.editNote(newNoteKey)}
          changeNoteValue={(i, e) =>
            functions.changeNoteValue(newNoteKey, e.value)
          }
          changeNoteTags={e => functions.changeNoteTags(newNoteKey, e)}
          saveNote={() => functions.saveNewNote()}
          cancelNote={() => functions.saveNote(newNoteKey, false)}
          selectedTags={functions.getNoteTags(newNoteKey)}
        />

        <NoteGroup
          notes={top3}
          itemsPerRow={3}
          state={state}
          functions={functions}
        />
        <NoteGroup
          notes={next4}
          itemsPerRow={4}
          state={state}
          functions={functions}
        />
        <NoteGroup
          notes={rest}
          itemsPerRow={5}
          state={state}
          functions={functions}
        />
      </Container>
    );
  }
}

export default DeskNotes;
