import React, { Component } from "react";
import DeskHeader from "./DeskHeader";
import TagSearch from "./TagSearch";
import DeskNotes from "./DeskNotes";
import { Container } from "semantic-ui-react";

//It seems like I'm passing the same constants to Board as well as to NotesOnDisplay. I wonder if theres a better way.
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
        <DeskHeader />
        <TagSearch
          tagMap={state.tagMap}
          onChange={e => functions.megamethod(e)}
        />
        <DeskNotes
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
