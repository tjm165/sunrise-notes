import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { TagDropdown } from "../implementations/Dropdown";
import NoteMenu from "../implementations/Note/NoteMenu";

class SelectionGrid extends Component {
  render() {
    const { tagMap, functions, notes } = this.props;
    const arrayNotes = Array.from(notes);

    return (
      <Grid celled>
        <Grid.Column width={8}>
          <Icon name="tags" />
          Select tags...
          <TagDropdown
            placeholder="Use me to select tags..."
            tagMap={tagMap}
            open
            onChange={(e, DropdownProps) =>
              functions.fetchNoteSet(DropdownProps.value)
            }
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <NoteMenu notes={arrayNotes} functions={functions} tagMap={tagMap} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SelectionGrid;
