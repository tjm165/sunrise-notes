import React, { Component } from "react";
import { Icon, Card } from "semantic-ui-react";

class Note extends Component {
  render() {
    const { UUID, note, setAsActiveNote } = this.props;
    const title = note.title;
    const content = note.content;
    const rgb = note.rgb;
    const rgbString = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

    return (
      <Card onClick={() => setAsActiveNote(UUID)}>
        <Card.Content>
          <Card.Header>
            <Icon name="sticky note" style={{ color: rgbString }} />
            {title}
          </Card.Header>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default Note;
//        style={{color: rgbString}}
