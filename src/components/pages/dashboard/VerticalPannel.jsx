import React, { useState } from "react";
import { Menu, Header, Divider, Dropdown } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Tag/TagDropdown";
import { NEW_INSTANCE_UUID } from "../../../API";

export default function VerticalPannel({ tagMap, functions }) {
  const ALL_NOTES = 1;
  const TAG_SELECTORS = 2;

  const [active, setActive] = useState(ALL_NOTES);

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
    <Menu pointing secondary vertical>
      <Menu.Item
        active={active === ALL_NOTES}
        onClick={() => setActive(ALL_NOTES)}
      >
        <Header as="h4">All notes</Header>
      </Menu.Item>
      <Divider />

      <Menu.Item
        active={active === TAG_SELECTORS}
        onClick={() => setActive(TAG_SELECTORS)}
      >
        <Header as="h4">Must have</Header>
        <TagDropdown
          text="Notes must have these tags"
          tagMap={tagMap}
          item
          setAsActiveTag={functions.setAsActiveTag}
          onChange={(e, DropdownProps) =>
            functions.fetchNoteSet(DropdownProps.value)
          }
        />
        <Header as="h4">Can have</Header>
        <Dropdown
          placeholder="Notes can have at least one of these tags"
          fluid
          selection
        />
      </Menu.Item>
    </Menu>
  );
}
{
  /* <Button onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}>
          New Note
        </Button> */
}
