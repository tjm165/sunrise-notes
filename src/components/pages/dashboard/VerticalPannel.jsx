import React, { useState } from "react";
import {
  Menu,
  Header,
  Divider,
  Button,
  Dropdown,
  Icon
} from "semantic-ui-react";
import { NEW_INSTANCE_UUID } from "../../../API";

export default function VerticalPannel({ tagMap, functions }) {
  const createOptions = [
    {
      key: "blank note",
      icon: "sticky note",
      text: "Create a Blank Note",
      onClick: () => functions.setAsActiveNote(NEW_INSTANCE_UUID)
    }
  ];

  return (
    <Menu pointing secondary vertical fluid>
      <Menu.Item>
        <Button.Group color="green">
          <Button
            onClick={() =>
              functions.setAsActiveNote(NEW_INSTANCE_UUID, "withContextTags")
            }
          >
            Create Note
          </Button>
          <Dropdown
            className="button icon"
            floating
            options={createOptions}
            trigger={<React.Fragment />}
          />
        </Button.Group>
      </Menu.Item>
      <Menu.Item>
        <Button
          positive
          onClick={() => functions.setAsActiveTag(NEW_INSTANCE_UUID)}
        >
          Create Tag
        </Button>
      </Menu.Item>
    </Menu>
  );
}
