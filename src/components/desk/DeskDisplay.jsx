import React, { Component } from "react";
import DeskHeader from "./DeskHeader";
import TagSearch from "./TagSearch";
import DeskNotes from "./DeskNotes";
import { Container } from "semantic-ui-react";

//It seems like I'm passing the same constants to Board as well as to NotesOnDisplay. I wonder if theres a better way.
class DeskDisplay extends Component {
  render() {
    const { state, functions } = this.props;

    return (
      <Container>
        <DeskHeader signIn={functions.AWS_signIn} />
        <TagSearch
          tagMap={state.tagMap}
          onChange={e => functions.setContextTags(e)}
        />
        <DeskNotes state={state} functions={functions} />
      </Container>
    );
  }
}

export default DeskDisplay;
