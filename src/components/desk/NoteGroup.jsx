import React, { Component } from "react";
import Note from "./Note";
import { Card } from "semantic-ui-react";

class NoteGroup extends Component {
  render() {
    const { notes, itemsPerRow, state } = this.props;

    return (
      <Card.Group itemsPerRow={itemsPerRow}>
        {notes.map(note => (
          <Note
            tagMap={state.tagMap}
            value={state.noteMap.get(note).getValue()}
          />
        ))}
      </Card.Group>
    );
  }
}

export default NoteGroup;
