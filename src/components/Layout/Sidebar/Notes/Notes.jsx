import React, { Component } from "react";
import Note from "./Note";
import { Menu } from "semantic-ui-react";

class Notes extends Component {
  render() {
    const { functions, tagMap, notes } = this.props;

    return (
      <>
        {notes.map(([key, note]) => (
          <Menu.Item onClick={() => functions.setAsActiveNote(key)}>
            <Note
              key={key}
              setAsActiveNote={functions.setAsActiveNote}
              UUID={key}
              tagMap={tagMap} //don't think I need this one
              note={note}
            />
          </Menu.Item>
        ))}
      </>
    );
  }
}

export default Notes;
