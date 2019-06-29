import React, { useState, useEffect } from "react";
import NoteEditor from "../implementations/Note/NoteEditor";
import ControlGrid from "./ControlGrid";
import { Button, Segment, Sidebar } from "semantic-ui-react";

function Layout({ state, functions }) {
  useEffect(() => {
    functions.fetchUserTags();
  }, []);

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
          <ControlGrid notes={notes} tagMap={tagMap} functions={functions} />
        </Sidebar>

        <Sidebar.Pusher>
          <Button
            icon={isExpanded ? "expand" : "expand arrows alternate"}
            onClick={() => setExpanded(!isExpanded)}
          />
          <NoteEditor
            tagMap={tagMap}
            note={state.activeNote}
            insertTags={state.activeNote.UUID ? [] : state.context.tags}
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
