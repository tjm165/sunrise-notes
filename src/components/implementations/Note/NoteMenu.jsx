import React from "react";
import { Card } from "semantic-ui-react";
import NoteCard from "./NoteCard";

function NoteMenu({ notes, functions }) {
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

export default NoteMenu;
