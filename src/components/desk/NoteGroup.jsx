import React, { Component } from "react";
import Note from "./Note";
import { Card } from "semantic-ui-react";
import { Container } from "semantic-ui-react";

class NoteGroup extends Component {
  render() {
    const { notes, itemsPerRow, state, functions } = this.props;

    return (
      <Card.Group itemsPerRow={itemsPerRow}>
        {notes.map(note => (
          <Note
            index_o={note}
            state={state}
            functions={functions}
            selectedTags={functions.getNoteTags(note)}
          />
        ))}
      </Card.Group>
    );
  }
}

export default NoteGroup;
