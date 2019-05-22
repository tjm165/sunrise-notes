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
              onChange={(i, e) => functions.changeNoteValue(index_o, e.value)}
            />
          </Form>
        </Card.Content>

        {editing ? (
          <Card.Content extra>
            <TagSearch
              tagObjects={state.tagObjects}
              onChange={e => functions.changeNoteTags(index_o, e)}
              defaultValue={selectedTags}
            />
            <Button onClick={() => functions.saveNote(index_o, true)}>
              Save
            </Button>
            <Button onClick={() => functions.saveNote(index_o, false)}>
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
