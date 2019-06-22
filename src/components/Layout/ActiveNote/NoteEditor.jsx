import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../../Implementations/Dropdown";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.test = this.test.bind(this);

    this.state = {
      removeTags: [],
      insertTags: [],
      previousTags: props.note.tagUUIDs
    };
  }

  handleSubmit(event) {
    this.props.onSubmit({
      ...this.props.note,
      title: this.title.current.value,
      content: this.content.current.value,
      insertTags: this.state.insertTags,
      removeTags: this.state.removeTags
    });

    //clear insert and remove tags
    event.preventDefault();
  }

  test(current) {
    const previous = this.state.previousTags;
    const isInserting = current.length > previous.length;

    const insertTags = this.state.insertTags;
    const removeTags = this.state.removeTags;

    if (isInserting) {
      const toInsert = current[current.length - 1];

      if (removeTags.includes(toInsert)) {
      } else {
        insertTags.push(toInsert);
      }
    } else {
    }

    this.setState({
      insertTags: insertTags,
      removeTags: removeTags,
      previousTags: current
    });
  }

  render() {
    const { note, tagMap } = this.props;
    const title = note.title;
    const content = note.content;
    const defaultTagUUIDs = note.tagUUIDs;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <textarea defaultValue={title} ref={this.title} />
          <textarea defaultValue={content} ref={this.content} />
          <TagDropdown
            placeholder="tags..."
            tagMap={tagMap}
            defaultValue={defaultTagUUIDs}
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
