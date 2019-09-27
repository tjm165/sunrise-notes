import React from "react";
import { Dropdown, Form, Radio } from "semantic-ui-react";

function OperationSelector({ operation, functions }) {
  const options = [
    {
      key: "union",
      text: "Any",
      value: "union",
      image: { avatar: true, src: "/images/avatar/small/jenny.jpg" }
    },
    {
      key: "intersection",
      text: "all",
      value: "intersection",
      image: { avatar: true, src: "/images/avatar/small/elliot.jpg" }
    }
  ];
  return (
    <>
      <span>
        Show me posts by{" "}
        <Dropdown inline options={options} defaultValue={options[0].value} />
      </span>

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
    </>
  );
}

export default OperationSelector;
