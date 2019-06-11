import React, { Component } from "react";
import Note from "../note/Note";
import { NoteEditor } from "../note/Note";
import TagMenu from "./TagMenu";
import { Grid, Card } from "semantic-ui-react";

class Layout extends Component {
  componentDidMount() {
    this.props.functions.fetchUserTags();
  }

  render() {
    const { state, functions } = this.props;
    const notes = state.context.notes;
    const tagMap = state.tagMap;
    const noteMap = state.noteMap;
    const editNoteUUID = state.editNoteUUID;

    return (
      <Grid columns="equal">
        <Grid.Column color="black">
          <TagMenu
            tagMap={state.tagMap}
            onChange={e => functions.fetchNoteSet(e)}
            open
          />
        </Grid.Column>
        <Grid.Column color="blue">
          <Card.Group itemsPerRow={1}>
            {Array.from(notes).map(note => (
              <Note
                key={note}
                selectNoteToEdit={functions.noteFunctions.selectNoteToEdit}
                UUID={note}
                tagMap={tagMap}
                note={noteMap.get(note)}
              />
            ))}
          </Card.Group>
        </Grid.Column>
        <Grid.Column>
          <NoteEditor
            note={noteMap.get(editNoteUUID)}
            save={functions.noteFunctions.saveEditNote}
            g={editNoteUUID}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Layout;
