import React, { useState } from "react";
import { TextArea, Icon, Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../Tag/TagDropdown";

const NoteEditor = ({ note, tagMap, onSubmit, onDelete }) => {
  const defaultTags = note.insertTags ? note.insertTags : note.tagUUIDs;
  const [tagsToInsert, setTagsToInsert] = useState(note.insertTags || []);
  const [tagsToRemove, setTagsToRemove] = useState([]);
  const [previousTags, setPreviousTags] = useState(note.tagUUIDs || []);

  console.log(defaultTags);

  const handleSubmit = event => {
    onSubmit(
      {
        UUID: note.UUID,
        title: event.currentTarget.title.value,
        content: event.currentTarget.content.value
      },
      tagsToInsert,
      tagsToRemove
    );
  };

  const handleTagChange = ({ value }) => {
    const isInserting = value.length > previousTags.length;

    if (isInserting) {
      const toInsert = value[value.length - 1];

      if (tagsToRemove.includes(toInsert)) {
      } else {
        tagsToInsert.push(toInsert); //can probably set state here
      }
    } else {
      const toRemove = previousTags.filter(x => !value.includes(x))[0]; //perhaps we can make one variable for isInserting and !isInserting and call it difference
      if (tagsToInsert.includes(toRemove)) {
      } else {
        tagsToRemove.push(toRemove); //can probably set state here
      }
    }

    setTagsToInsert(tagsToInsert); //instead of setting state here
    setTagsToRemove(tagsToRemove); //instead of setting state here

    setPreviousTags(previousTags);
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
        tagMap={tagMap}
        defaultValue={defaultTags}
        onChange={(e, DropdownProps) => handleTagChange(DropdownProps)}
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
      <Button icon onClick={onDelete}>
        <Icon name="trash alternate" />
        Delete
      </Button>
    </Form>
  );
};

export default NoteEditor;
