import React from "react";
import { Menu, Button, Dropdown } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Tag/TagDropdown";
import { NEW_INSTANCE_UUID } from "../../../API";

function ControlMenu({ tagMap, functions }) {
  const otherNewOptions = [
    {
      key: "newContextNote",
      icon: "sticky note",
      text: "New Note with Tags",
      onClick: () =>
        functions.setAsActiveNote(NEW_INSTANCE_UUID, "withContextTags")
    },

    {
      key: "newTag",
      icon: "tag",
      text: "New Tag",
      onClick: () => functions.setAsActiveTag(NEW_INSTANCE_UUID)
    }
  ];
  return (
    <Menu vertical>
      <TagDropdown
        text="Use me to select tags..."
        tagMap={tagMap}
        item
        setAsActiveTag={functions.setAsActiveTag}
        onChange={(e, DropdownProps) =>
          functions.fetchNoteSet(DropdownProps.value)
        }
      />
      <Button.Group color="green">
        <Button onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}>
          New Note
        </Button>
        <Dropdown
          className="button icon"
          floating
          options={otherNewOptions}
          trigger={<React.Fragment />}
        />
      </Button.Group>
    </Menu>
  );
}

export default ControlMenu;
