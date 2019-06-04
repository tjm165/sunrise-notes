import React, { Component } from "react";
import { Icon, Button, Card, Modal, Form, TextArea } from "semantic-ui-react";

class Editor extends Component {
  render() {
    return (
      <div>
        <Form>
          <TextArea value={title} />
          <TextArea value={content} />
          <Search tagMap={tagMap} defaultValue={selectedTags} />
        </Form>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </div>
    );
  }
}

export default Editor;
