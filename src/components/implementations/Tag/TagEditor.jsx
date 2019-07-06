import React from "react";
import { Form, TextArea, Button, Label, Icon } from "semantic-ui-react";
import { NEW_INSTANCE_UUID } from "../../../API";
import Tag from "../../../objects/Tag";

const TagEditor = ({ tag, onSubmit, onDelete }) => {
  const handleSubmit = event => {
    onSubmit(
      new Tag(
        event.currentTarget.title.value,
        tag.noteUUIDs,
        { r: 0, g: 0, b: 0 },
        tag.UUID
      )
    );

    event.preventDefault();
  };

  const isPreexisting = tag["UUID"] !== NEW_INSTANCE_UUID; //isInDatabase

  return (
    <>
      <Label>Edit Tag</Label>
      <Form onSubmit={handleSubmit}>
        <TextArea name="title" defaultValue={tag.title} placeholder="Title" />
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
    </>
  );
};

export default TagEditor;
