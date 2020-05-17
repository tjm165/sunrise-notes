import React, { useState } from "react";
import { FlexEditor, Items } from "../../../components";
import { NEW_INSTANCE_UUID } from "../../../API";
import { Container, Header } from "semantic-ui-react";
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
  const isnotesempty = noteArray.length == 0;
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

      {/* items.map((key) => Flex(item, mode = activeNote.UUID === key)) */}
      {items.length > 0 && (
        <Items items={items} functions={functions} {...flexNoteProps} />
      )}
    </>
  );
}
