import React, { useState } from "react";
import { Form, TextArea, Button, Label, Icon } from "semantic-ui-react";
import { NEW_INSTANCE_UUID } from "../../../API";
import { TwitterPicker } from "react-color";

const TagEditor = ({ tag, onSubmit, onDelete }) => {
  const handleSubmit = event => {
    onSubmit({
      title: event.currentTarget.title.value,
      rgb: rgb,
      UUID: tag.UUID
    });

    event.preventDefault();
  };

  const [rgb, setRGB] = useState(tag.rgb);

  const isPreexisting = tag["UUID"] !== NEW_INSTANCE_UUID; //isInDatabase

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"
      }}
    >
      <Label>Edit Tag</Label>

      <TextArea name="title" defaultValue={tag.title} placeholder="Title" />
      <TwitterPicker
        color={rgb}
        onChangeComplete={color => setRGB(color.rgb)}
      />
      <Button icon>
        <Icon name="save" />
        Save
      </Button>

      {isPreexisting && (
        <Button icon onClick={onDelete}>
          <Icon name="trash alternate" />
          Delete
        </Button>
      )}
    </Form>
  );
};

export default TagEditor;
