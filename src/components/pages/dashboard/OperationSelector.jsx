import React from "react";
import { Button } from "semantic-ui-react";

function OperationSelector({ operation, functions }) {
  return (
    <>
      <Button.Group>
        <Button
          primary={operation === "union"}
          onClick={() => functions.setOperation("union")}
        >
          OR
        </Button>
        <Button.Or />
        <Button
          primary={operation === "intersection"}
          onClick={() => functions.setOperation("intersection")}
        >
          AND
        </Button>
      </Button.Group>
    </>
  );
}

export default OperationSelector;
