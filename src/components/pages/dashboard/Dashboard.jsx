import React, { useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Segment,
  Header,
  Grid
} from "semantic-ui-react";
import Board from "./Board";
import TopPannel from "./TopPannel";
import TagEditor from "../../implementations/Tag/TagEditor";
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

      <div style={{ height: "100vh", backgroundColor: "#EEEEEE" }}>
        <Grid container columns="equal">
          <Grid.Column
            width={4}
            style={{
              borderRadius: "0px"
            }}
          >
            <Segment raised>
              <VerticalPannel
                operation={operation}
                tagMap={tagMap}
                context={context}
                functions={functions}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <Board
                functions={functions}
                notes={notes}
                isLoading={isLoading}
                activeNote={activeNote}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>

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
