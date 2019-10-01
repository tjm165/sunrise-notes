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
import TagEditor from "../../implementations/Tag/TagEditor";
import NoteEditor from "../../implementations/Note/NoteEditor";
import NoteSelector from "../../implementations/Note/NotesSelector";
import { NO_INSTANCE_UUID } from "../../../API";
import VerticalPannel from "./VerticalPannel";

function Dashboard({ state, functions }) {
  useEffect(() => {
    functions.fetchUserTags();
    functions.fetchNoteSet();
  }, []);

  const context = state.context;
  const operation = state.operation;

  const isLoading = state.isLoading;
  const activeTag = context.activeTag;
  const notes = context.notes;
  const activeNote = context.activeNote;
  const tagMap = state.tagMap;

  return (
    <>
      <TopPannel />

      <Grid divided>
        <Grid.Column
          width={2}
          style={{ borderRadius: "0px", backgroundColor: "#EEEEEE" }}
        >
          <Segment>
            <VerticalPannel
              operation={operation}
              tagMap={tagMap}
              context={context}
              functions={functions}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column
          width={14}
          style={{ borderRadius: "0px", backgroundColor: "#EEEEEE" }}
        >
          <Segment>
            {activeNote ? (
              <>
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
              </>
            ) : (
              <NoteSelector
                functions={functions}
                notes={Array.from(notes)}
                tagMap={tagMap}
                isLoading={isLoading}
              />
            )}
          </Segment>
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
