import React from "react";
import { Loader, Menu, Segment, Header, Icon } from "semantic-ui-react";
import NoteSegment from "./NoteSegment";
import NoteCreateButton from "./NoteCreateButton";

export default function NoteSelector({ notes, functions, isLoading }) {
  const isLoadingNotes = isLoading.fetchNoteSet;

  return isLoadingNotes ? (
    <Loader active={isLoading} inline="centered" />
  ) : (
    <>
      {notes.length > 0 ? (
        <NotesMenu notes={notes} functions={functions} />
      ) : (
        <NoNotesFound functions={functions} />
      )}
    </>
  );
}

function NotesMenu({ notes, functions }) {
  return (
    <Menu pointing vertical fluid>
      {notes.map(([key, note]) => (
        <NoteSegment
          note={note}
          onEdit={() => functions.setAsActiveNote(key)}
          onDelete={() => functions.deleteNote(key)}
        />
      ))}
    </Menu>
  );
}

function NoNotesFound({ functions }) {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="write" />
        You don't have notes in this section... yet
      </Header>
      <Segment.Inline>
        <NoteCreateButton primary label="Write a Note" functions={functions} />
      </Segment.Inline>
    </Segment>
  );
}
