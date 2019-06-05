import React, { Component } from "react";
import { Icon, Button, Card, Modal, Form, TextArea } from "semantic-ui-react";

class NoteEditor extends Component {
  render() {
    return (
      <div>
        <Form>
          <TextArea value="a" />
          <TextArea value="b" />
          {/* <Search tagMap={tagMap} defaultValue={selectedTags} /> */}
        </Form>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </div>
    );
  }
}

export default NoteEditor;
