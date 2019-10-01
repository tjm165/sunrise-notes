import React from "react";
import { NEW_INSTANCE_UUID } from "../../../API";
import NoteCreateButton from "../../implementations/Note/NoteCreateButton";
import TagExplorer from "../../implementations/Tag/TagExplorer";
import OperationSelector from "./OperationSelector";
import { Segment } from "semantic-ui-react";

export default function VerticalPannel({
  operation,
  tagMap,
  context,
  functions
}) {
  return (
    <>
      <NoteCreateButton positive functions={functions} />
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
