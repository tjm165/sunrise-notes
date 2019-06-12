import React, { Component } from "react";
import { Icon, Button, Card, Modal, Form, TextArea } from "semantic-ui-react";

class NoteEditorDisplay extends Component {
  render() {
    const { note, functions } = this.props;
    const title = note.title;
    const content = note.content;

    return (
      <div>
        <Form>
          <TextArea
            value={title}
            onChange={e => functions.setTitle(e.target.value)}
          />
          <TextArea
            value={content}
            onChange={e => functions.setContent(e.target.value)}
          />
          {/* <Search tagMap={tagMap} defaultValue={selectedTags} /> */}
          <Button onClick={e => functions.save(note)}>Save</Button>
          <Button>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditorDisplay;
