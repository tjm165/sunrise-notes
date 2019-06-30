import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { TagDropdown } from "./TagDropdown";

function TagMenu({ tagMap, functions }) {
  return (
    <>
      <Button positive onClick={() => functions.setAsActiveTag(true)}>
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
    </>
  );
}

export default TagMenu;
