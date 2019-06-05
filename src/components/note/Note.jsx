import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import Ellipsis from "../reuse/Ellipsis";

class Note extends Component {
  render() {
    const { UUID, note, edit } = this.props;
    const title = note.title;
    const content = note.content;
    const ellipsisComponents = [
      <Button onClick={() => edit(UUID)}>Edit</Button>,
      <Button>Delete</Button>
    ];

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {title} <Ellipsis components={ellipsisComponents} />
          </Card.Header>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default Note;
