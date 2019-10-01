import React from "react";
import { Button } from "semantic-ui-react";

import { NEW_INSTANCE_UUID } from "../../../API";

export default function NoteCreateButton({
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
