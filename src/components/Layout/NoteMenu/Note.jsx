import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";

class Note extends Component {
  render() {
    const { UUID, note, setAsActiveNote } = this.props;
    const title = note.title;
    const content = note.content;

    return (
      <Card onClick={() => setAsActiveNote(UUID)}>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default Note;
