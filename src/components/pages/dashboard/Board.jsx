import React, { useState } from "react";
import List from "../../implementations/List";
import FlexEditor from "../../implementations/Flex/FlexEditor";
import Items from "../../implementations/Flex/Items";
import Images from "../../implementations/Flex/Images";
import Paragraphs from "../../implementations/Flex/Paragraphs";
import { NEW_INSTANCE_UUID } from "../../../API";
import { Image, Icon, Segment, Container, Header } from "semantic-ui-react";
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
      {/* These are FlexGroups! */}
      {items.length > 0 ? (
        <Items items={items} functions={functions} {...flexNoteProps} />
      ) : (
        <Container>
          <Header>You do not have any notes in this section</Header>
          <NoteCreateButton positive functions={functions} />
        </Container>
      )}

      {/* Images
      <Images images={images} functions={functions} {...flexNoteProps} /> */}
    </>
  );
}
