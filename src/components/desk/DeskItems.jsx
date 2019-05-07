import React, { Component } from "react";
import Note from "./Note";
import { Card } from "../../../node_modules/semantic-ui-react";
import { Container } from "semantic-ui-react";

class DeskItems extends Component {
  render() {
    const { state, functions } = this.props;
    const tagsInCurrentContext = state.contexts[state.currentContext].tags;
    const notes = Array.from(functions.getContextNotes());
    const notesToRender = [2, 1, 3];

    var i = 0;
    return (
      <Container>
        <Card.Group>
          {notes.map(note => (
            <Note index_o={note} state={state} functions={functions} />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default DeskItems;
