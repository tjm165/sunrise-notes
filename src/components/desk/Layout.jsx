import React, { Component } from "react";
import Note from "../note/Note";
import { NoteEditor } from "../note/Note";
import TagSelector from "./TagSelector";
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
        <Grid.Column>
          <TagSelector
            tagMap={state.tagMap}
            onChange={e => functions.fetchNoteSet(e)}
          />
        </Grid.Column>
        <Grid.Column>
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
