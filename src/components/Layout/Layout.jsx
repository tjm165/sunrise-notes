import React, { useState, useEffect } from "react";
import NoteEditor from "../implementations/Note/NoteEditor";
import SelectionGrid from "./SelectionGrid";
import { Button, Segment, Sidebar } from "semantic-ui-react";

function Layout(props) {
  useEffect(() => {
    props.functions.fetchUserTags();
  });

  const { state, functions } = props;
  const notes = state.context.notes;
  const tagMap = state.tagMap;
  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible={!isExpanded}
          width="very wide"
        >
          <SelectionGrid notes={notes} tagMap={tagMap} functions={functions} />
        </Sidebar>

        <Sidebar.Pusher>
          <Button
            icon="expand arrows alternate"
            onClick={() => setExpanded(!isExpanded)}
          />
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

export default Layout;
