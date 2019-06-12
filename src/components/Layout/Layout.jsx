import React, { Component } from "react";
import Note from "./NoteMenu/Note";
import NoteEditor from "./ActiveNote/NoteEditor";
import TagMenu from "./TagMenu/TagMenu";
import NoteMenu from "./NoteMenu/NoteMenu";
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
    const activeNoteUUID = state.activeNoteUUID;

    return (
      <Grid columns="equal">
        <Grid.Column color="black">
          <TagMenu
            tagMap={tagMap}
            onChange={e => functions.fetchNoteSet(e)}
            open
          />
        </Grid.Column>
        <Grid.Column color="blue">
          <Card.Group itemsPerRow={1}>
            <NoteMenu
              notes={Array.from(notes)}
              functions={functions}
              tagMap={tagMap}
              noteMap={noteMap}
            />
          </Card.Group>
        </Grid.Column>
        <Grid.Column>
          {state.activeNoteUUID && (
            <NoteEditor
              note={noteMap.get(activeNoteUUID)}
              onSubmit={functions.submitActiveNote}
              noteUUID={activeNoteUUID}
              key={activeNoteUUID}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Layout;
