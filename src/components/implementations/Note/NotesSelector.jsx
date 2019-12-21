import React from "react";
import { Loader, Menu, Segment, Header, Icon } from "semantic-ui-react";
import NoteSegment from "./NoteSegment";
import List, { Entry } from "../List/List";

export default function NoteSelector({ notes, functions, isLoading }) {
  const isLoadingNotes = isLoading.fetchNoteSet;

  return (
    <List title="Notes">
      {Array.from(notes.keys()).map((key, index) => (
        <Entry>{notes.get(key).title}</Entry>
      ))}
    </List>
  );
}
