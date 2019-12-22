import React, { useState } from "react";
import { TextArea, Icon, Button, Form } from "semantic-ui-react";
import { TagDropdown } from "./implementations/Tag/TagDropdown";
import { NEW_INSTANCE_UUID } from "../API";

export default function FlexEditor({
  note,
  tagMap,
  onSubmit,
  onDelete,
  setAsActiveTag,
  isLoading,
  type
}) {
  const isPreexisting = note["UUID"] !== NEW_INSTANCE_UUID;
  const [tagUUIDs, setTagUUIDs] = useState(note.tagUUIDs || []);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      UUID: note.UUID,
      title,
      content,
      tagUUIDs,
      type
    });
  };

  return (
    <Form loading={isLoading.setAsActiveNote}>
      <TextArea
        name="content"
        defaultValue={content}
        placeholder="Enter content here..."
        onChange={(e, { value }) => setContent(value)}
      />
      <TagDropdown
        placeholder="Add tags to your note"
        fluid
        isLoading={isLoading}
        tagMap={tagMap}
        defaultValue={tagUUIDs}
        onChange={(e, DropdownProps) => setTagUUIDs(DropdownProps.value)}
        setAsActiveTag={setAsActiveTag}
      />
      <Button
        positive
        icon
        onClick={handleSubmit}
        loading={isLoading.submitNote}
      >
        <Icon name="save" />
        Save
      </Button>
      {isPreexisting && (
        <Button icon onClick={onDelete} loading={isLoading.deleteNote}>
          <Icon name="trash alternate" />
          Delete
        </Button>
      )}
    </Form>
  );
}
