import React, { useState } from "react";
import { Form, TextArea, Button, Header, Icon } from "semantic-ui-react";
import { NEW_INSTANCE_UUID } from "../../../API";
import { TwitterPicker } from "react-color";

const TagEditor = ({ tag, onSubmit, onDelete, isLoading }) => {
  const handleSubmit = event => {
    onSubmit({
      title,
      rgb,
      UUID: tag.UUID
    });

    event.preventDefault();
  };

  const [rgb, setRGB] = useState(tag.rgb);
  const [title, setTitle] = useState(tag.title);

  const isPreexisting = tag["UUID"] !== NEW_INSTANCE_UUID; //isInDatabase

  return (
    <Form
      style={{
        backgroundColor: "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"
      }}
    >
      <Header>Edit Tag</Header>

      <TextArea
        name="title"
        defaultValue={title}
        placeholder="Title"
        onChange={(e, { value }) => setTitle(value)}
      />
      <TwitterPicker
        color={rgb}
        onChangeComplete={color => setRGB(color.rgb)}
      />
      <Button
        positive
        icon
        onClick={handleSubmit}
        loading={isLoading.submitTag}
      >
        <Icon name="save" />
        Save
      </Button>

      {isPreexisting && (
        <Button icon onClick={onDelete} loading={isLoading.deleteTag}>
          <Icon name="trash alternate" />
          Delete
        </Button>
      )}
    </Form>
  );
};

export default TagEditor;
