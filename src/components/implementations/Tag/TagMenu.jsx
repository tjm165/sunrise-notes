import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { TagDropdown } from "./TagDropdown";
import TagEditor from "./TagEditor";

function TagMenu({ tagMap, functions }) {
  const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);

  return (
    <>
      <Button positive onClick={() => setIsTagEditorOpen(true)}>
        <Icon name="pencil" />
        New Tag
      </Button>
      <TagDropdown
        placeholder="Use me to select tags..."
        tagMap={tagMap}
        open
        onChange={(e, DropdownProps) =>
          functions.fetchNoteSet(DropdownProps.value)
        }
      />
      <Modal open={isTagEditorOpen} closeIcon>
        <TagEditor />
        <Button positive onClick={() => setIsTagEditorOpen(false)}>
          Close
        </Button>
      </Modal>
    </>
  );
}

export default TagMenu;
