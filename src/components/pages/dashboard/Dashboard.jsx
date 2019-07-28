import React, { useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Segment,
  Header,
  Divider,
  Grid
} from "semantic-ui-react";
import TopPannel from "./TopPannel";
import { TagDropdown } from "../../implementations/Tag/TagDropdown";
import TagEditor from "../../implementations/Tag/TagEditor";
import NoteEditor from "../../implementations/Note/NoteEditor";
import NoteMenu from "../../implementations/Note/NoteMenu";
import { NO_INSTANCE_UUID } from "../../../API";
import VerticalPannel from "./VerticalPannel";

function Dashboard({ state, functions }) {
  useEffect(() => {
    functions.fetchUserTags();
  }, []);

  const notes = state.context.notes;
  const activeTag = state.activeTag;
  const activeNote = state.activeNote;
  const tagMap = state.tagMap;

  return (
    <>
      <TopPannel />

      <Grid>
        <Grid.Column width={2}>
          <VerticalPannel tagMap={tagMap} functions={functions} />
        </Grid.Column>
        <Grid.Column width={14}>
          <Container>
            {activeNote ? (
              <Segment stacked={notes.size > 0}>
                <Button
                  onClick={() => functions.setAsActiveNote(NO_INSTANCE_UUID)}
                >
                  back
                </Button>
                <NoteEditor
                  key={JSON.stringify(state.activeNote)}
                  tagMap={tagMap}
                  note={activeNote}
                  onSubmit={functions.submitNote}
                  onDelete={() =>
                    functions.deleteNote(state.activeNote["UUID"])
                  }
                  setAsActiveTag={functions.setAsActiveTag}
                />
              </Segment>
            ) : (
              <>
                <Header>
                  Search for notes that have all of the following tags:{" "}
                </Header>
                <TagDropdown
                  placeholder="Notes must have these tags"
                  tagMap={tagMap}
                  fluid
                  setAsActiveTag={functions.setAsActiveTag}
                  onChange={(e, DropdownProps) =>
                    functions.fetchNoteSet(DropdownProps.value)
                  }
                />
                <Divider as="br" />
                <NoteMenu
                  functions={functions}
                  notes={Array.from(notes)}
                  tagMap={tagMap}
                />
              </>
            )}
          </Container>
        </Grid.Column>
      </Grid>

      {activeTag && (
        <Modal
          open={activeTag}
          closeIcon
          onClose={() => functions.setAsActiveTag(NO_INSTANCE_UUID)}
        >
          <TagEditor
            tag={activeTag}
            userUUID={state.userUUID}
            onSubmit={functions.submitTag}
            onDelete={() => functions.deleteTag(activeTag["UUID"])}
          />
          <Button
            positive
            onClick={() => functions.setAsActiveTag(NO_INSTANCE_UUID)}
          >
            Close
          </Button>
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
