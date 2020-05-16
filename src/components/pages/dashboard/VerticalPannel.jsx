import React from "react";
import { NEW_INSTANCE_UUID } from "../../../API";
import TagList from "../../implementations/Tag/TagList";
import OperationSelector from "./OperationSelector";
import { Button, Divider } from "semantic-ui-react";

export default function VerticalPannel({
  operation,
  tagMap,
  context,
  functions,
}) {
  return (
    <>
      <NoteCreateButton positive functions={functions} />
      <Divider></Divider>

      <OperationSelector operation={operation} functions={functions} />
      <br />
      <TagList
        operation={operation}
        tagMap={tagMap}
        selectedTags={context.tags}
        functions={functions}
      />
    </>
  );
}

export function NoteCreateButton({
  label = "Create Note",
  functions,
  ...rest
}) {
  return (
    <Button
      {...rest}
      onClick={() => functions.setAsActiveNote(NEW_INSTANCE_UUID)}
    >
      {label}
    </Button>
  );
}
