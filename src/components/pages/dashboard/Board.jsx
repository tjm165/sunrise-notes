import React from "react";
import {
  TextArea,
  Loader,
  Menu,
  Segment,
  Header,
  Icon
} from "semantic-ui-react";

import List from "../../implementations/List";
import FlexContainer from "./../../FlexContainer";

export default function Board({ activeNote, functions, notes, isLoading }) {
  const isLoadingNotes = isLoading.fetchNoteSet;

  return (
    <>
      <List title="Notes">
        {/* We are going to need to split note types some how.. */}
        {Array.from(notes.keys()).map((key, index) => (
          <FlexContainer
            isSelected={activeNote.UUID === key}
            onClick={() => functions.setAsActiveNote(key)}
          >
            <> {notes.get(key).title}</>
            <TextEditor></TextEditor>
          </FlexContainer>
        ))}
      </List>

      <Segment>
        <FlexContainer>
          <>Click to select</> <TextEditor></TextEditor>
        </FlexContainer>
      </Segment>
    </>
  );
}

function TextEditor({}) {
  return <>alt</>;
}

function imageEditor({}) {}
