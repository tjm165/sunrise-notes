import React, { Component } from "react";
import {
  Button,
  Card,
  Modal,
  Form,
  TextArea
} from "../../../node_modules/semantic-ui-react";
import TagSearch from "./TagSearch";

class Note extends Component {
  render() {
    const { tagMap, note } = this.props;
    const value = note.getValue();
    const selectedTags = note.tagUUIDs;

    return (
      <Card>
        <Modal trigger={<Card.Content>{value}</Card.Content>}>
          <Modal.Content>
            <TagSearch tagMap={tagMap} defaultValue={selectedTags} />
            <Button>Save</Button>
            <Button>Cancel</Button>
          </Modal.Content>
        </Modal>
      </Card>
    );
  }
}
export default Note;
