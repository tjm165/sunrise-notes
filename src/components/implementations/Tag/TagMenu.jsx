import React from "react";
import { Icon } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Dropdown";

function TagMenu({ tagMap, functions }) {
  return (
    <>
      <Icon name="tags" />
      {/* Make a Tag Menu */}
      Select tags...
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
