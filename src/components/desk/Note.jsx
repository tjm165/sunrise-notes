import React, { Component } from "react";
import { Card, Form, TextArea } from "../../../node_modules/semantic-ui-react";
import { Container } from "semantic-ui-react";

class Note extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;
    var component;

    if (index_o === state.focusedNote) {
      component = (
        <Form>
          <TextArea
            placeholder={value}
            onChange={(i, e) => functions.setNoteValue(index_o, e)}
          />
        </Form>
      );
    } else {
      component = (
        <Container text onClick={i => functions.setFocusedNote(index_o)}>
          {value}
        </Container>
      );
    }

    return <Card>{component}</Card>;
  }
}

export default Note;
