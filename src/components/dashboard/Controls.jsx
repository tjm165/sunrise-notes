import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { TagDropdown } from "../implementations/Tag/TagDropdown";
import { NEW_INSTANCE_UUID } from "../../API";

function Controls({ tagMap, functions }) {
  return (
    <Menu>
      <Menu.Item>
        <TagDropdown
          placeholder="Use me to select tags..."
          tagMap={tagMap}
          item
          setAsActiveTag={functions.setAsActiveTag}
          onChange={(e, DropdownProps) =>
            functions.fetchNoteSet(DropdownProps.value)
          }
        />
      </Menu.Item>
      <Menu.Item>
        <Button
          positive
          onClick={() => functions.setAsActiveTag(NEW_INSTANCE_UUID)}
        >
          <Icon name="pencil" />
          New Tag
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          positive
          onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}
        >
          <Icon name="pencil" />
          New note
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default Controls;
