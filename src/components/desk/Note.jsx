import React, { Component } from "react";
import { Card, Form, TextArea } from "../../../node_modules/semantic-ui-react";
import { Container } from "semantic-ui-react";
import TagSearch from "./TagSearch";

class Note extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;

    var inFocus = index_o === state.focusedNote;

    return (
      <Card>
        <Card.Content>
          <Form>
            <TextArea
              onFocus={() => functions.setFocusedNote(index_o)}
              onBlur={() => functions.setFocusedNote(-1)}
              placeholder={value}
              value={value}
              onChange={(i, e) => functions.setNoteValue(index_o, e)}
            />
          </Form>
        </Card.Content>

        {inFocus ? (
          <Card.Content extra>
            <TagSearch
              tagObjects={state.tagObjects}
              onChange={functions.setFocusedNoteTags}
            />
          </Card.Content>
        ) : (
          ""
        )}
      </Card>
    );
  }
}
export default Note;
