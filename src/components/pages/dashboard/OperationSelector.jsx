import React from "react";
import { Form, Radio } from "semantic-ui-react";

function OperationSelector({ operation, functions }) {
  return (
    <Form>
      <Form.Field>Show notes with</Form.Field>
      <Form.Field>
        <Radio
          toggle
          label="any"
          name="radioGroup"
          checked={operation === "union"}
          onChange={() => functions.setOperation("union")}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          toggle
          label="all"
          name="radioGroup"
          checked={operation === "intersection"}
          onChange={() => functions.setOperation("intersection")}
        />
      </Form.Field>
      <Form.Field>selected tags</Form.Field>
    </Form>
  );
}

export default OperationSelector;
