import React, { Component } from "react";
import { Icon, Card } from "semantic-ui-react";

class NoteCard extends Component {
  render() {
    const { note, onClick } = this.props;
    const title = note.title;
    const content = note.content;
    const rgb = note.rgb;
    const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;

    return (
      <Card onClick={onClick} style={{ backgroundColor: rgbstring }}>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default NoteCard;
