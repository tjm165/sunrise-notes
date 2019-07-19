import React, { useState, useEffect } from "react";
import NoteEditor from "../implementations/Note/NoteEditor";
import Controls from "./Controls";
import { Button, Segment, Sidebar, Modal } from "semantic-ui-react";
import TagEditor from "../implementations/Tag/TagEditor";
import { NO_INSTANCE_UUID } from "../../API";

function Dashboard({ state, functions }) {
  useEffect(() => {
    functions.fetchUserTags();
  }, []);

  const notes = state.context.notes;
  const activeTag = state.activeTag;
  const tagMap = state.tagMap;
  const [isExpanded, setExpanded] = useState(false);
  const arrayNotes = Array.from(notes);

  return (
    <>
      <Controls notes={notes} tagMap={tagMap} functions={functions} />

      <Button
        icon={isExpanded ? "expand" : "expand arrows alternate"}
        onClick={() => setExpanded(!isExpanded)}
      />
      <NoteEditor
        key={JSON.stringify(state.activeNote)}
        tagMap={tagMap}
        note={state.activeNote}
        onSubmit={functions.submitNote}
        onDelete={() => functions.deleteNote(state.activeNote["UUID"])}
        setAsActiveTag={functions.setAsActiveTag}
      />

      {activeTag && (
        <Modal
          open={activeTag}
          closeIcon
          onClose={() => functions.setAsActiveTag(NO_INSTANCE_UUID)}
        >
          <TagEditor
            tag={activeTag}
            userUUID={state.userUUID}
            onSubmit={functions.submitTag}
            onDelete={() => functions.deleteTag(activeTag["UUID"])}
          />
          <Button
            positive
            onClick={() => functions.setAsActiveTag(NO_INSTANCE_UUID)}
          >
            Close
          </Button>
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
