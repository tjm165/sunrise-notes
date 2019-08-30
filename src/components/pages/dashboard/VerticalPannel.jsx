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
import TagExplorer from "../../implementations/Tag/TagExplorer";

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
    <>
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
      <TagExplorer tagMap={tagMap} functions={functions} />
    </>
  );
}
