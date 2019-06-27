import React, { Component } from "react";
import { Divider, Header, Icon, Card, Menu, Button } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Dropdown";
import Notes from "./Notes/Notes";

class Sidebar extends Component {
  render() {
    const { tagMap, functions, notes } = this.props;
    const arrayNotes = Array.from(notes);

    return (
      <>
        <Menu
          style={{ maxHeight: "20%" }}
          borderless
          compact
          fluid
          inverted
          vertical
          style={{ overflowY: "scroll" }}
        >
          <Menu.Item header as="h4">
            <Icon name="tags" />
            Select tags...
          </Menu.Item>
          <Menu.Item>
            <TagDropdown
              placeholder="Use me to select tags..."
              tagMap={tagMap}
              onChange={(e, DropdownProps) =>
                functions.fetchNoteSet(DropdownProps.value)
              }
            />{" "}
          </Menu.Item>
          <Menu.Item>
            <Button positive>
              <Icon name="pencil" />
              New note
            </Button>
          </Menu.Item>
        </Menu>
        <Menu
          borderless
          compact
          fluid
          inverted
          vertical
          style={{ overflowY: "scroll" }}
        >
          <Menu.Item header>
            {notes.size > 0
              ? "Select a note"
              : "... and your notes will appear here"}
          </Menu.Item>
          {notes.size > 0 && (
            <Notes
              notes={arrayNotes} //does this need to be an array any more? I think it's a map now
              functions={functions}
              tagMap={tagMap}
            />
          )}
        </Menu>
      </>
    );
  }
}

export default Sidebar;
