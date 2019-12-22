import React, { useState } from "react";
import List from "../../implementations/List";
import FlexContainer from "./../../FlexContainer";
import FlexEditor from "./../../FlexEditor";
import { NEW_INSTANCE_UUID } from "../../../API";
import { Image } from "semantic-ui-react";

export default function Board({
  tagMap,
  activeNote,
  functions,
  notes,
  isLoading
}) {
  const isLoadingNotes = isLoading.fetchNoteSet;
  const items = Array.from(notes.keys());
  const paragraph = Array.from(notes.keys());
  const images = Array.from(notes.keys());

  const flexNoteProps = {
    noteMap: notes,
    activeNote,
    functions,
    isLoading,
    tagMap
  };

  return (
    <>
      <h1>Notes</h1>
      {activeNote.UUID === NEW_INSTANCE_UUID && (
        <FlexEditor
          type="item"
          isLoading={isLoading}
          note={activeNote}
          tagMap={tagMap}
          onSubmit={functions.submitNote}
          onDelete={() => functions.deleteNote(activeNote["UUID"])}
        />
      )}
      <List stacked>
        <FlexNotes notes={items} {...flexNoteProps} />
      </List>

      <>
        <FlexNotes notes={paragraph} {...flexNoteProps} />
      </>
      <Image.Group>
        <FlexNotes notes={images} {...flexNoteProps} />
      </Image.Group>
    </>
  );
}

function FlexNotes({
  noteMap,
  notes,
  activeNote,
  functions,
  isLoading,
  tagMap
}) {
  return (
    <>
      {notes.map(key => (
        <FlexContainer
          isSelected={activeNote.UUID === key}
          onClick={() => functions.setAsActiveNote(key)}
        >
          <> {noteMap.get(key).content}</>
          <FlexEditor
            type="item"
            isLoading={isLoading}
            note={activeNote}
            tagMap={tagMap}
            onSubmit={functions.submitNote}
            onDelete={() => functions.deleteNote(activeNote["UUID"])}
          />
        </FlexContainer>
      ))}
    </>
  );
}
