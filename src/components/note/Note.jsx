import React, { Component } from "react";
import { Button, Card, Modal, Form, TextArea } from "semantic-ui-react";
import Search from "../tag/Search";

class Note extends Component {
  render() {
    const { tagMap, note } = this.props;
    const title = note.title;
    const content = note.content;
    const selectedTags = note.tagUUIDs;

    return (
      <Card>
        <Modal
          trigger={
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              <Card.Description>{content}</Card.Description>
            </Card.Content>
          }
        >
          <Modal.Content>
            <Form>
              <TextArea value={title} />
              <TextArea value={content} />
              <Search tagMap={tagMap} defaultValue={selectedTags} />
            </Form>
            <Button>Save</Button>
            <Button>Cancel</Button>
          </Modal.Content>
        </Modal>
      </Card>
    );
  }
}
export default Note;
