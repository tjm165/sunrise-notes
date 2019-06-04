import React, { Component } from "react";
import {
  Button,
  Popup,
  Icon,
  Card,
  Modal,
  Form,
  TextArea
} from "semantic-ui-react";
import Ellipsis from "../reuse/Ellipsis";

class Note extends Component {
  render() {
    const { tagMap, note } = this.props;
    const title = note.title;
    const content = note.content;
    const selectedTags = note.tagUUIDs;

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {title} <Ellipsis />
          </Card.Header>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default Note;
