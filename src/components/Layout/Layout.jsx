import React, { useState, useEffect } from "react";
import NoteEditor from "../implementations/Note/NoteEditor";
import ControlGrid from "./ControlGrid";
import { Button, Segment, Sidebar, Modal } from "semantic-ui-react";
import TagEditor from "../implementations/Tag/TagEditor";
import Tag from "../../objects/Tag";

function Layout({ state, functions }) {
  useEffect(() => {
    functions.fetchUserTags();
  }, []);

  const notes = state.context.notes;
  const activeTag = state.activeTag;
  const tagMap = state.tagMap;
  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          animation="push"
          icon="labeled"
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
            key={Math.random()}
            tagMap={tagMap}
            note={state.activeNote}
            onDelete={() => functions.deleteNote(state.activeNote["UUID"])}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>

      <Modal open={activeTag} closeIcon>
        <TagEditor
          tag={activeTag === true ? new Tag() : tagMap.get(activeTag)}
          onSubmit={functions.submitActiveTag}
        />
        <Button positive onClick={() => functions.setAsActiveTag(false)}>
          Close
        </Button>
      </Modal>
    </>
  );
}

export default Layout;
