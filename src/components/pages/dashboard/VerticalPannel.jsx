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

export default function VerticalPannel({ tagMap, context, functions }) {
  return (
    <>
      <Button
        positive
        onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}
      >
        Create Note
      </Button>
      <TagExplorer
        tagMap={tagMap}
        selectedTags={context.tags}
        functions={functions}
      />
    </>
  );
}
