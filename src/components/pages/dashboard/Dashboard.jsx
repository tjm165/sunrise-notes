import React, { useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Segment,
  Header,
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

  const context = state.context;

  const isLoading = state.isLoading;
  const activeTag = context.activeTag;
  const notes = context.notes;
  const activeNote = context.activeNote;
  const tagMap = state.tags;

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
                  isLoading={isLoading}
                />
              </Segment>
            ) : (
              <>
                <Header>
                  Search for notes that have any of the following tags:{" "}
                </Header>

                {notes.size > 0 ? (
                  <NoteMenu
                    functions={functions}
                    notes={Array.from(notes)}
                    tagMap={tagMap}
                    isLoading={isLoading}
                  />
                ) : (
                  <>There are no notes that have any of the selected tags </>
                )}
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
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
