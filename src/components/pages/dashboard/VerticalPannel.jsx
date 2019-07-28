import React, { useState } from "react";
import { Menu, Header, Divider, Button } from "semantic-ui-react";
import { NEW_INSTANCE_UUID } from "../../../API";

export default function VerticalPannel({ tagMap, functions }) {
  const ALL_NOTES = 1;
  const TAG_SELECTORS = 2;

  const [active, setActive] = useState(ALL_NOTES);

  return (
    <Menu pointing secondary vertical fluid>
      <Menu.Item>
        <Button icon="plus" />
      </Menu.Item>
      <Menu.Item>
        <Button onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}>
          Create Note
        </Button>
      </Menu.Item>
    </Menu>
  );
}

// const otherNewOptions = [
//   {
//     key: "newContextNote",
//     icon: "sticky note",
//     text: "New Note with Tags",
//     onClick: () =>
//       functions.setAsActiveNote(NEW_INSTANCE_UUID, "withContextTags")
//   },
//   {
//     key: "newTag",
//     icon: "tag",
//     text: "New Tag",
//     onClick: () => functions.setAsActiveTag(NEW_INSTANCE_UUID)
//   }
// ];
// <Button onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}>
//        New Note
//      </Button>
