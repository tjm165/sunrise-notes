import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../../Implementations/Dropdown";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);

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

    this.setState({ removeTags: [], insertTags: [] });
    event.preventDefault();
  }

  handleTagChange({ value }) {
    const previous = this.state.previousTags;
    const isInserting = value.length > previous.length;

    const insertTags = this.state.insertTags;
    const removeTags = this.state.removeTags;

    if (isInserting) {
      const toInsert = value[value.length - 1];

      if (removeTags.includes(toInsert)) {
      } else {
        insertTags.push(toInsert);
      }
    } else {
      let toRemove = previous.filter(x => !value.includes(x))[0]; //perhaps we can make one variable for isInserting and !isInserting and call it difference
      if (insertTags.includes(toRemove)) {
      } else {
        removeTags.push(toRemove);
      }
    }

    this.setState({
      insertTags: insertTags,
      removeTags: removeTags,
      previousTags: value
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
            onChange={(e, DropdownProps) => this.handleTagChange(DropdownProps)}
          />
          <Button>Save</Button>
          <Button>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditor;
