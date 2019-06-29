import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import TagMenu from "../implementations/Tag/TagMenu";
import NoteMenu from "../implementations/Note/NoteMenu";

class ControlGrid extends Component {
  render() {
    const { tagMap, functions, notes } = this.props;
    const arrayNotes = Array.from(notes);

    return (
      <Grid celled>
        <Grid.Column width={8}>
          <TagMenu tagMap={tagMap} functions={functions} />
        </Grid.Column>
        <Grid.Column width={8}>
          <NoteMenu notes={arrayNotes} functions={functions} tagMap={tagMap} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ControlGrid;
