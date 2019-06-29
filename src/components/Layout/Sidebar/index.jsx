import React, { Component } from "react";
import { Grid, Icon, Menu, Button } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Dropdown";
import Notes from "./Notes/Notes";

class Sidebar extends Component {
  render() {
    const { tagMap, functions, notes } = this.props;
    const arrayNotes = Array.from(notes);

    return (
      <Grid celled>
        <Grid.Column width={8}>
          <Icon name="tags" />
          Select tags...
          <TagDropdown
            className="hi"
            placeholder="Use me to select tags..."
            tagMap={tagMap}
            open
            onChange={(e, DropdownProps) =>
              functions.fetchNoteSet(DropdownProps.value)
            }
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Button positive onClick={() => functions.setAsActiveNote(0)}>
            <Icon name="pencil" />
            New note
          </Button>
          <Menu vertical>
            <Menu.Item header>
              {notes.size > 0
                ? "Select a note"
                : "... and your notes will appear here"}
            </Menu.Item>
            {notes.size > 0 && (
              <Notes notes={arrayNotes} functions={functions} tagMap={tagMap} />
            )}
          </Menu>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Sidebar;
