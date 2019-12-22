import React, { useState } from "react";
import { TextArea, Icon, Button, Form } from "semantic-ui-react";
import List from "../../implementations/List";
import FlexContainer from "./../../FlexContainer";
import { NEW_INSTANCE_UUID } from "../../../API";
import { TagDropdown } from "../../implementations/Tag/TagDropdown";

export default function Board({
  tagMap,
  activeNote,
  functions,
  notes,
  isLoading
}) {
  const isLoadingNotes = isLoading.fetchNoteSet;

  return (
    <>
      <List title="Notes" stacked>
        {/* We are going to need to split note types some how.. */}
        {Array.from(notes.keys()).map((key, index) => (
          <FlexContainer
            isSelected={activeNote.UUID === key}
            onClick={() => functions.setAsActiveNote(key)}
          >
            <> {notes.get(key).title}</>
            <TextEditor
              isLoading={isLoading}
              note={activeNote}
              tagMap={tagMap}
              onSubmit={functions.submitNote}
              onDelete={() => functions.deleteNote(activeNote["UUID"])}
            ></TextEditor>
          </FlexContainer>
        ))}
      </List>

      <FlexContainer>
        <>Click to select</> <TextEditor />
      </FlexContainer>
    </>
  );
}

function TextEditor({
  note,
  tagMap,
  onSubmit,
  onDelete,
  setAsActiveTag,
  isLoading
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
}

function imageEditor({}) {}
