import React, { Component } from "react";
import NoteEditor from "./NoteEditor/NoteEditor";
import { TagDropdown } from "../implementations/Dropdown";

import Notes from "./Notes/Notes";
import { Divider, Header, Icon, Grid, Card } from "semantic-ui-react";

class Layout extends Component {
  componentDidMount() {
    this.props.functions.fetchUserTags();
  }

  render() {
    const { state, functions } = this.props;
    const notes = state.context.notes;
    const tagMap = state.tagMap;

    return (
      <Grid padded>
        {/* This is the query column */}
        <Grid.Column width="3" color="green" verticalAlign="top">
          <Divider horizontal>
            <Header as="h4">
              <Icon name="tag" />
              Select tags...
            </Header>
          </Divider>

          <TagDropdown
            placeholder="Use me to select tags..."
            tagMap={tagMap}
            onChange={(e, DropdownProps) =>
              functions.fetchNoteSet(DropdownProps.value)
            }
          />
          <Divider horizontal>
            <Header as="h4">
              {notes.size > 0
                ? "Select a note"
                : "... and your notes will appear here"}
            </Header>
          </Divider>

          <Card.Group itemsPerRow={1}>
            <Notes
              notes={Array.from(notes)} //does this need to be an array any more? I think it's a map now
              functions={functions}
              tagMap={tagMap}
            />
          </Card.Group>
        </Grid.Column>

        {/* This is the active note column */}
        <Grid.Column width="13">
          {state.activeNote && (
            <NoteEditor
              tagMap={tagMap}
              note={state.activeNote}
              onSubmit={functions.submitActiveNote}
              key={state.activeNote["UUID"]}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Layout;
