import React, { Component } from "react";
import DeskHeader from "./DeskHeader";
import DeskSearch from "./DeskSearch";
import DeskNotes from "./DeskNotes";
import { Container } from "semantic-ui-react";

//It seems like I'm passing the same constants to Board as well as to NotesOnDisplay. I wonder if theres a better way.
class DeskDisplay extends Component {
  render() {
    const { state, functions } = this.props;

    return (
      <Container>
        <DeskHeader state={state} functions={functions} />
        <DeskSearch state={state} functions={functions} />
        <DeskNotes state={state} functions={functions} />
      </Container>
    );
  }
}

export default DeskDisplay;
