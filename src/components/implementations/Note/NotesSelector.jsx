import React from "react";
import { Loader, Card, Segment, Header, Icon } from "semantic-ui-react";
import NoteCard from "./NoteCard";
import NoteCreateButton from "./NoteCreateButton";

export default function NoteSelector({ notes, functions, isLoading }) {
  const isLoadingNotes = isLoading.fetchNoteSet;

  return isLoadingNotes ? (
    <Loader active={isLoading} inline="centered" />
  ) : (
    <Segment>
      {notes.length > 0 ? (
        <NotesMenu notes={notes} functions={functions} />
      ) : (
        <NoNotesFound />
      )}
    </Segment>
  );
}

function NotesMenu({ notes, functions }) {
  return (
    <Card.Group>
      {notes.map(([key, note]) => (
        <NoteCard
          note={note}
          onEdit={() => functions.setAsActiveNote(key)}
          onDelete={() => functions.deleteNote(key)}
        />
      ))}
    </Card.Group>
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
