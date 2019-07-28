import React, { useState } from "react";
import { TextArea, Icon, Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../Tag/TagDropdown";
import { NEW_INSTANCE_UUID } from "../../../API";

const NoteEditor = ({ note, tagMap, onSubmit, onDelete, setAsActiveTag }) => {
  const isPreexisting = note["UUID"] !== NEW_INSTANCE_UUID;
  const [tagUUIDs, setTagUUIDs] = useState(note.tagUUIDs || []);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      UUID: note.UUID,
      title: event.currentTarget.title.value,
      content: event.currentTarget.content.value,
      tagUUIDs
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        name="title"
        defaultValue={note.title}
        placeholder="Give your note a title..."
      />
      <TagDropdown
        placeholder="Add tags to your note"
        fluid
        tagMap={tagMap}
        defaultValue={tagUUIDs}
        onChange={(e, DropdownProps) => setTagUUIDs(DropdownProps.value)}
        setAsActiveTag={setAsActiveTag}
      />
      <TextArea
        name="content"
        defaultValue={note.content}
        placeholder="Enter content here..."
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

export default NoteEditor;
