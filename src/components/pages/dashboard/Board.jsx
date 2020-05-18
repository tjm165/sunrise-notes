import React, { useState } from "react";
import { FlexEditor, Flex, Items } from "../../../components";
import { NEW_INSTANCE_UUID } from "../../../API";
import { Container, Header, List } from "semantic-ui-react";
import { NoteCreateButton } from "../dashboard/VerticalPannel";

export default function Board({
  tagMap,
  activeNote,
  functions,
  notes,
  isLoading,
}) {
  const isLoadingNotes = isLoading.fetchNoteSet;

  const noteArray = Array.from(notes.keys());
  const isNotesEmpty = noteArray.length == 0;
  const items = noteArray.filter((key) => notes.get(key).type === "item");
  const paragraphs = noteArray.filter(
    (key) => notes.get(key).type === "paragraph"
  );
  const links = noteArray.filter((key) => notes.get(key).type === "link");
  const images = noteArray.filter((key) => notes.get(key).type === "image");

  const flexNoteProps = {
    noteMap: notes,
    activeNote,
    functions,
    isLoading,
    tagMap,
  };

  return (
    <>
      <h1>Notes</h1>
      {activeNote.UUID === NEW_INSTANCE_UUID && (
        //Flex(editor, type = item by default)
        <FlexEditor
          functions={functions}
          key={activeNote.tagUUIDs}
          type="item"
          isLoading={isLoading}
          note={activeNote}
          tagMap={tagMap}
          onSubmit={functions.submitNote}
          onDelete={() => functions.deleteNote(activeNote["UUID"])}
          setAsActiveTag={functions.setAsActiveTag}
        />
      )}

      {isNotesEmpty && (
        <Container>
          <Header>You do not have any notes in this section</Header>
          <NoteCreateButton positive functions={functions} />
        </Container>
      )}
      {/* Dont know why list component is here */}
      <List>
        {items.map((key) => (
          <Flex
            key={key}
            isInEditMode={key === activeNote}
            noteIndex={key}
            isInEditMode={false}
            items={items}
            type="item"
            functions={functions}
            {...flexNoteProps}
          />
        ))}
      </List>
    </>
  );
}
