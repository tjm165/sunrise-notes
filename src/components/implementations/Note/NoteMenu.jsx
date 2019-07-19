import React from "react";
import { Card } from "semantic-ui-react";
import NoteCard from "./NoteCard";

function NoteMenu({ notes, functions }) {
  return (
    <Card.Group>
      {notes.map(([key, note]) => (
        <NoteCard note={note} onClick={() => functions.setAsActiveNote(key)} />
      ))}
    </Card.Group>
  );
}

export default NoteMenu;
