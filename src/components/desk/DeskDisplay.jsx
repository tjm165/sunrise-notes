import React, { Component } from "react";
import Header from "../header/Header";
import Notes from "./Notes";
import TagSelector from "./TagSelector";
import { Container } from "semantic-ui-react";

class DeskDisplay extends Component {
  componentDidMount() {
    this.props.functions.fetchUserTags();
  }

  render() {
    const { state, functions } = this.props;
    const notes = state.context.notes;
    const tagMap = state.tagMap;
    const noteMap = state.noteMap;

    return (
      <Container>
        <Header />
        <TagSelector
          tagMap={state.tagMap}
          onChange={e => functions.megamethod(e)}
        />
        <Notes
          notes={Array.from(notes)}
          tagMap={tagMap}
          noteMap={noteMap}
          functions={functions}
        />
      </Container>
    );
  }
}

export default DeskDisplay;
