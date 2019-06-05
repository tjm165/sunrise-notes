import React, { Component } from "react";
import { Container, Modal } from "semantic-ui-react";
import NoteGroup from "../note/NoteGroup";
import NoteEditor from "../note/NoteEditor";

class DeskNotes extends Component {
  render() {
    const { selectNoteToEdit, editNote, notes, tagMap, noteMap } = this.props;
    const size = notes.length;
    const top3 = notes.slice(0, 3);
    const next4 = notes.slice(3, 7);
    const rest = notes.slice(6, size - 6);
    const shouldNoteEditorDisplay = editNote.UUID != -1;

    return (
      <Container>
        <NoteGroup
          notes={top3}
          itemsPerRow={3}
          tagMap={tagMap}
          noteMap={noteMap}
          selectNoteToEdit={selectNoteToEdit}
        />
        <NoteGroup
          notes={next4}
          itemsPerRow={4}
          tagMap={tagMap}
          noteMap={noteMap}
          selectNoteToEdit={selectNoteToEdit}
        />
        <NoteGroup
          notes={rest}
          itemsPerRow={5}
          tagMap={tagMap}
          noteMap={noteMap}
          selectNoteToEdit={selectNoteToEdit}
        />
        <Modal open={shouldNoteEditorDisplay}>
          <NoteEditor />
        </Modal>
      </Container>
    );
  }
}

export default DeskNotes;
