import React, { Component } from "react";
import NoteEditor from "./NoteEditor/NoteEditor";
import Sidebar from "./Sidebar/index";
import { Grid } from "semantic-ui-react";

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
        <Grid.Column width="3" verticalAlign="top" color="black">
          <Sidebar notes={notes} tagMap={tagMap} functions={functions} />
        </Grid.Column>

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
