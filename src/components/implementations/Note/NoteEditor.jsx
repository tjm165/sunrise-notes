import React, { useState } from "react";
import { TextArea, Icon, Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../Tag/TagDropdown";
import { NEW_INSTANCE_UUID } from "../../../API";

const NoteEditor = ({
  note,
  tagMap,
  onSubmit,
  onDelete,
  setAsActiveTag,
  isLoading
}) => {
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
      tagUUIDs
    });
  };

  return (
    <Form loading={isLoading.setAsActiveNote}>
      <TextArea
        name="title"
        defaultValue={title}
        placeholder="Give your note a title..."
        onChange={(e, { value }) => setTitle(value)}
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
      <TextArea
        name="content"
        defaultValue={content}
        placeholder="Enter content here..."
        onChange={(e, { value }) => setContent(value)}
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
};

export default NoteEditor;
