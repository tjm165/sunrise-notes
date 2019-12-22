import React, { useState } from "react";
import List from "../../implementations/List";
import FlexContainer from "./../../FlexContainer";
import FlexEditor from "./../../FlexEditor";
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
  const items = Array.from(notes.keys());
  const text = Array.from(notes.keys());
  const images = Array.from(notes.keys());

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
        {/* We are going to need to split note types some how.. */}
        {items.map(key => (
          <FlexContainer
            isSelected={activeNote.UUID === key}
            onClick={() => functions.setAsActiveNote(key)}
          >
            <> {notes.get(key).content}</>
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
      </List>
    </>
  );
}
