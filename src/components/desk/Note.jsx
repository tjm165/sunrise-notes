import React, { Component } from "react";
import {
  Button,
  Card,
  Form,
  TextArea
} from "../../../node_modules/semantic-ui-react";
import { Container } from "semantic-ui-react";
import TagSearch from "./TagSearch";

class Note extends Component {
  render() {
    const { index_o, state, functions, selectedTags } = this.props;
    const noteObject = state.noteObjects[index_o];
    const value = noteObject.getValue();
    const editing = noteObject.editing;

    return (
      <Card>
        <Card.Content>
          <Form>
            <TextArea
              onFocus={() => functions.editNote(index_o)}
              placeholder={value}
              value={value}
              onChange={(i, e) => functions.setNoteEditValue(index_o, e)}
            />
          </Form>
        </Card.Content>

        {editing ? (
          <Card.Content extra>
            <TagSearch
              tagObjects={state.tagObjects}
              onChange={(i, e) => functions.setNoteEditTags(index_o, e)}
              defaultValue={selectedTags}
            />
            <Button onClick={() => functions.finishNoteEdit(index_o, true)}>
              Save
            </Button>
            <Button onClick={() => functions.finishNoteEdit(index_o, false)}>
              Cancel
            </Button>
          </Card.Content>
        ) : (
          ""
        )}
      </Card>
    );
  }
}
export default Note;
