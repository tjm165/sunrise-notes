import React from "react";
import { Card, Segment, Loader } from "semantic-ui-react";
import NoteCard from "./NoteCard";

function NoteMenu({ notes, functions, isLoading }) {
  return (
    <Segment>
      <Loader active={isLoading.fetchNoteSet} />
      <Card.Group>
        {notes.map(([key, note]) => (
          <NoteCard
            note={note}
            onEdit={() => functions.setAsActiveNote(key)}
            onDelete={() => functions.deleteNote(key)}
          />
        ))}
      </Card.Group>
    </Segment>
  );
}

export default NoteMenu;
