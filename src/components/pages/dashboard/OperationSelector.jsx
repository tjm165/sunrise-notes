import React from "react";
import { Dropdown, Form, Radio } from "semantic-ui-react";

function OperationSelector({ operation, functions }) {
  const options = [
    {
      key: "union",
      text: "or",
      value: "union",
      image: { avatar: true, src: "/images/avatar/small/jenny.jpg" }
    },
    {
      key: "intersection",
      text: "and",
      value: "intersection",
      image: { avatar: true, src: "/images/avatar/small/elliot.jpg" }
    }
  ];
  return (
    <>
      <Form>
        <Form.Field>Filter:</Form.Field>
        <Form.Field>
          <Radio
            toggle
            label="or"
            name="radioGroup"
            checked={operation === "union"}
            onChange={() => functions.setOperation("union")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            toggle
            label="and"
            name="radioGroup"
            checked={operation === "intersection"}
            onChange={() => functions.setOperation("intersection")}
          />
        </Form.Field>
      </Form>
    </>
  );
}

export default OperationSelector;
