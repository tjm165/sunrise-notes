import React, { Component } from "react";
import { TextArea, Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Dropdown";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.tagUUIDs = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      ...this.props.note,
      tagUUIDs: this.tagUUIDs.current.value,
      title: this.title.current.value,
      content: this.content.current.value
    });
    event.preventDefault();
  }

  render() {
    const { note, tagMap } = this.props;
    const title = note.title;
    const content = note.content;
    const tagUUIDs = note.tagUUIDs;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <textarea defaultValue={title} ref={this.title} />
          <textarea defaultValue={content} ref={this.content} />
          <TagDropdown
            placeholder="tags..."
            tagMap={tagMap}
            defaultValue={tagUUIDs}
          />
          <Button>Save</Button>
          <Button>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditor;
