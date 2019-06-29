import React, { Component } from "react";
import NoteEditor from "../implementations/Note/NoteEditor";
import SelectionGrid from "./SelectionGrid";
import { Segment, Sidebar } from "semantic-ui-react";

class Layout extends Component {
  componentDidMount() {
    this.props.functions.fetchUserTags();
  }

  render() {
    const { state, functions } = this.props;
    const notes = state.context.notes;
    const tagMap = state.tagMap;

    return (
      <>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation="push"
            icon="labeled"
            inverted
            vertical
            visible
            width="very wide"
          >
            <SelectionGrid
              notes={notes}
              tagMap={tagMap}
              functions={functions}
            />
          </Sidebar>

          <Sidebar.Pusher>
            <NoteEditor
              tagMap={tagMap}
              note={state.activeNote}
              onSubmit={functions.submitActiveNote}
              onDelete={() => functions.deleteNote(state.activeNote["UUID"])}
              key={state.activeNote["UUID"]}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  }
}

export default Layout;
