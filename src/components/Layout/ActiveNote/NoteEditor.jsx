import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../../Implementations/Dropdown";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.tagUUIDs = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.test = this.test.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      ...this.props.note,
      tagUUIDs: ["25"],
      title: this.title.current.value,
      content: this.content.current.value
    });
    event.preventDefault();
  }

  test(v) {
    alert(v);
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
            test={this.test}
            onChange={(e, DropdownProps) => this.test(DropdownProps.value)}
          />
          <Button>Save</Button>
          <Button>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditor;
