import React from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import { postTag } from "../../../API";

const TagEditor = ({ tag, userUUID }) => {
  const onSubmit = event => {
    postTag(
      {
        UUID: tag.UUID,
        title: event.currentTarget.title.value
      },
      userUUID
    );

    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea name="title" defaultValue={tag.title} />
      <Button>save</Button>
    </Form>
  );
};

export default TagEditor;
