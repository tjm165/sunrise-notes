import React, { Component } from "react";
import { Icon, Menu, Button } from "semantic-ui-react";
import NoteSegment from "./NoteSegment";

class NoteMenu extends Component {
  render() {
    const { notes, functions, tagMap } = this.props;

    return (
      <>
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
          {notes.map(([key, note]) => (
            <Menu.Item onClick={() => functions.setAsActiveNote(key)}>
              <NoteSegment
                key={key}
                UUID={key}
                tagMap={tagMap} //don't think I need this one
                note={note}
              />
            </Menu.Item>
          ))}
        </Menu>
      </>
    );
  }
}

export default NoteMenu;
