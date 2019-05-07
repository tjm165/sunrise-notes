import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import NoteGroup from "./NoteGroup";

class DeskNotes extends Component {
  render() {
    const { state, functions } = this.props;
    const tagsInCurrentContext = state.contexts[state.currentContext].tags;
    const notes = Array.from(functions.getContextNotes());
    const size = notes.length;
    const top3 = notes.slice(0, 3);
    const next4 = notes.slice(2, 7);
    const rest = notes.slice(6, size - 6);

    return (
      <Container>
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
