import React, { useState } from "react";
import List from "../../implementations/List";
import FlexContainer from "./../../FlexContainer";
import FlexEditor from "./../../FlexEditor";
import { NEW_INSTANCE_UUID } from "../../../API";
import { Image, Icon } from "semantic-ui-react";

export default function Board({
  tagMap,
  activeNote,
  functions,
  notes,
  isLoading
}) {
  const isLoadingNotes = isLoading.fetchNoteSet;
  const noteArray = Array.from(notes.keys());

  const flexNoteProps = {
    noteMap: notes,
    notes: noteArray,
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
      <Items functions={functions} {...flexNoteProps} />

      <>
        <FlexNotes {...flexNoteProps} />
      </>
      <Image.Group>
        <FlexNotes
          size="massive"
          type="image"
          notes={notes}
          {...flexNoteProps}
        ></FlexNotes>
      </Image.Group>
    </>
  );
}

function Items({
  noteMap,
  activeNote,
  functions,
  isLoading,
  type,
  tagMap,
  notes,
  ...rest
}) {
  return (
    <List>
      {notes
        .filter(key => noteMap.get(key).type === "item")
        .map(key => (
          <FlexContainer
            isSelected={activeNote.UUID === key}
            onClick={() => functions.setAsActiveNote(key)}
            {...rest}
            type={type}
          >
            <>
              <Icon
                onClick={() =>
                  functions.submitNote({
                    ...noteMap.get(key),
                    secondaryContent: !noteMap.get(key).secondaryContent
                  })
                }
                name={
                  noteMap.get(key).secondaryContent
                    ? "circle"
                    : "circle outline"
                }
              ></Icon>
              {noteMap.get(key).content}
            </>
            <FlexEditor
              type={type}
              isLoading={isLoading}
              note={activeNote}
              tagMap={tagMap}
              onSubmit={functions.submitNote}
              onDelete={() => functions.deleteNote(activeNote["UUID"])}
            />
          </FlexContainer>
        ))}
    </List>
  );
}

function FlexNotes({
  noteMap,
  notes,
  activeNote,
  functions,
  isLoading,
  type,
  tagMap,
  ...rest
}) {
  return (
    <>
      {notes.map(key => (
        <FlexContainer
          isSelected={activeNote.UUID === key}
          onClick={() => functions.setAsActiveNote(key)}
          {...rest}
          type={type}
        >
          {noteMap.get(key).content}
          <FlexEditor
            type={type}
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
