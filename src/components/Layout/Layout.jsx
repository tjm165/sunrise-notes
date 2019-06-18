import React, { Component } from "react";
import Note from "./NoteMenu/Note";
import NoteEditor from "./ActiveNote/NoteEditor";
import TagMenu from "./TagMenu/TagMenu";
import NoteMenu from "./NoteMenu/NoteMenu";
import { Divider, Header, Icon, Grid, Card } from "semantic-ui-react";

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
      <Grid padded>
        <Grid.Column width="3" color="green" verticalAlign="top">
          <Divider horizontal>
            <Header as="h4">
              <Icon name="tag" />
              Select tags
            </Header>
          </Divider>

          <TagMenu tagMap={tagMap} onChange={e => functions.fetchNoteSet(e)} />
          <Divider horizontal>
            <Header as="h4">
              {notes.size > 0 ? "Select a note" : "Notes will appear here"}
            </Header>
          </Divider>

          <Card.Group itemsPerRow={1}>
            <NoteMenu
              notes={Array.from(notes)}
              functions={functions}
              tagMap={tagMap}
              noteMap={noteMap}
            />
          </Card.Group>
        </Grid.Column>

        <Grid.Column width="13">
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
