import React, { Component } from "react";
import { TextArea, Button, Form } from "semantic-ui-react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.title);

    this.props.onSubmit({
      ...this.props.note,
      title: this.title.current.value,
      content: this.content.current.value
    });
    event.preventDefault();
  }

  render() {
    const { note, onSubmit } = this.props;
    const title = note.title;
    const content = note.content;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <textarea defaultValue={title} ref={this.title} />
          <textarea defaultValue={content} ref={this.content} />
          <Button>Save</Button>
          <Button>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditor;
