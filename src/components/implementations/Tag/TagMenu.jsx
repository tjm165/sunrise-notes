import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { TagDropdown } from "./TagDropdown";
import { NEW_INSTANCE_UUID } from "../../../API";

function TagMenu({ tagMap, functions }) {
  return (
    <>
      <Button
        positive
        onClick={() => functions.setAsActiveTag(NEW_INSTANCE_UUID)}
      >
        <Icon name="pencil" />
        New Tag
      </Button>
      <TagDropdown
        placeholder="Use me to select tags..."
        tagMap={tagMap}
        open
        setAsActiveTag={functions.setAsActiveTag}
        onChange={(e, DropdownProps) =>
          functions.fetchNoteSet(DropdownProps.value)
        }
      />
    </>
  );
}

export default TagMenu;
