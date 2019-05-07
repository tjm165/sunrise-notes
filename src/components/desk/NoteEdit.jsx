import React, { Component } from "react";
import { Card, Form, TextArea } from "../../../node_modules/semantic-ui-react";
import { Container } from "semantic-ui-react";

class NoteEdit extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;

    //a note contains blocks of content. Perhaps this should return an array of content?
    return (
      <Card.Content>
        <Form>
          <TextArea
            placeholder={value}
            value={value}
            onChange={(i, e) => functions.setNoteValue(index_o, e)}
          />
          <TextArea placeholder="tags" value="tags" />
        </Form>
      </Card.Content>
    );
  }
}

export default NoteEdit;
