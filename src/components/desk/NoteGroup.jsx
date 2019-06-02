import React, { Component } from "react";
import Note from "./Note";
import { Card } from "semantic-ui-react";

class NoteGroup extends Component {
  render() {
    const { notes, itemsPerRow, tagMap, noteMap } = this.props;

    return (
      <Card.Group itemsPerRow={itemsPerRow}>
        {notes.map(note => (
          <Note tagMap={tagMap} note={noteMap.get(note)} />
        ))}
      </Card.Group>
    );
  }
}

export default NoteGroup;
