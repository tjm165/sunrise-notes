import React, { useState } from "react";
import { TextArea, Icon, Button, Form, Dropdown } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Tag/TagDropdown";
import { NEW_INSTANCE_UUID, NO_INSTANCE_UUID } from "../../../API";
import OutsideCaller from "./OutsideCaller";

export default function FlexEditor({
  note,
  tagMap,
  onSubmit,
  onDelete,
  setAsActiveTag,
  isLoading,
  functions
}) {
  const isPreexisting = note["UUID"] !== NEW_INSTANCE_UUID;
  const [tagUUIDs, setTagUUIDs] = useState(note.tagUUIDs || []);
  const [secondaryContent] = useState(note.secondaryContent || false);

  const [content, setContent] = useState(note.content);
  const [type, setType] = useState(note.type || type || "paragraph"); //don't know if this will work

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      UUID: note.UUID,
      content,
      tagUUIDs,
      secondaryContent,
      type
    });
  };

  return (
    <OutsideCaller
      onOutsideClick={() => functions.setAsActiveNote(NO_INSTANCE_UUID)}
    >
      <Form loading={isLoading.setAsActiveNote}>
        <Dropdown
          value={type}
          onChange={(e, { value }) => setType(value)}
          options={[
            { key: "item", text: "item", value: "item" },
            { key: "image", text: "image", value: "image" },
            { key: "link", text: "link", value: "link" },
            { key: "paragraph", text: "paragraph", value: "paragraph" }
          ]}
        ></Dropdown>
        <TextArea
          name="content"
          defaultValue={content}
          placeholder="Enter content here..."
          onChange={(e, { value }) => setContent(value)}
        />
        <TagDropdown
          key={Math.random()}
          placeholder="Add tags to your note"
          fluid
          isLoading={isLoading}
          tagMap={tagMap}
          defaultValue={tagUUIDs}
          setTagUUIDs={setTagUUIDs}
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
    </OutsideCaller>
  );
}
