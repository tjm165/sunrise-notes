import React from "react";
import { Form, Radio } from "semantic-ui-react";

function OperationSelector({ operation, functions }) {
  return (
    <Form>
      <Form.Field>Operation:</Form.Field>
      <Form.Field>
        <Radio
          toggle
          label="Union"
          name="radioGroup"
          checked={operation === "union"}
          onChange={() => functions.setOperation("union")}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          toggle
          label="Intersection"
          name="radioGroup"
          checked={operation === "intersection"}
          onChange={() => functions.setOperation("intersection")}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          toggle
          label="Complement"
          name="radioGroup"
          checked={operation === "complement"}
          onChange={() => functions.setOperation("complement")}
        />
      </Form.Field>
    </Form>
  );
}

export default OperationSelector;
