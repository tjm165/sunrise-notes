import React, { Component } from "react";
import { Icon, Button, Card, Modal, Form, TextArea } from "semantic-ui-react";

class NoteEditorDisplay extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.title.current.value);

    // onSubmit({
    //   ...note,
    //   title: this.title.current.value,
    //   content: this.content.current.value
    // })
    event.preventDefault();
  }

  render() {
    const { note, onSubmit } = this.props;
    const title = note.title;
    const content = note.content;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <TextArea defaultValue={title} ref={this.title} />
          <TextArea defaultValue={content} ref={this.content} />
          <Button>Save</Button>
          <Button>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditorDisplay;
