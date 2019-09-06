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
import OperationSelector from "./OperationSelector";

export default function VerticalPannel({
  operation,
  tagMap,
  context,
  functions
}) {
  return (
    <>
      <Button
        positive
        onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}
      >
        Create Note
      </Button>

      <OperationSelector operation={operation} functions={functions} />
      <TagExplorer
        operation={operation}
        tagMap={tagMap}
        selectedTags={context.tags}
        functions={functions}
      />
    </>
  );
}
