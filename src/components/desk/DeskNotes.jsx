import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import NoteGroup from "./NoteGroup";
import Note from "./Note";

class DeskNotes extends Component {
  render() {
    const { notes, tagMap, noteMap, functions } = this.props;
    const size = notes.length;
    const top3 = notes.slice(0, 3);
    const next4 = notes.slice(3, 7);
    const rest = notes.slice(6, size - 6);

    return (
      <Container>

        <NoteGroup notes={top3} itemsPerRow={3} state={state} />
        <NoteGroup notes={next4} itemsPerRow={4} state={state} />
        <NoteGroup notes={rest} itemsPerRow={5} state={state} />
      </Container>
    );
  }
}

export default DeskNotes;
