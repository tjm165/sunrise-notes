import React, { Component } from "react";
import {
  Button,
  Card,
  Form,
  TextArea
} from "../../../node_modules/semantic-ui-react";
import TagSearch from "./TagSearch";

class Note extends Component {
  render() {
    const {
      tagMap,
      value,
      editing,
      saveNote,
      cancelNote,
      editNote,
      changeNoteValue,
      selectedTags,
      changeNoteTags
    } = this.props;

    return (
      <Card>
        <Card.Content>
          <Form>
            <TextArea
              onFocus={editNote}
              placeholder={value}
              value={value}
              onChange={changeNoteValue}
            />
          </Form>
        </Card.Content>

        {editing ? (
          <Card.Content extra>
            <TagSearch
              tagMap={tagMap}
              onChange={changeNoteTags}
              defaultValue={selectedTags}
            />
            <Button onClick={saveNote}>Save</Button>
            <Button onClick={cancelNote}>Cancel</Button>
          </Card.Content>
        ) : (
          ""
        )}
      </Card>
    );
  }
}
export default Note;
