import React, { Component } from "react";
import { Icon, Button, Form } from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Dropdown";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.content = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);

    this.state = {
      removeTags: [],
      insertTags: props.insertTags,
      previousTags: props.note.tagUUIDs
    };
  }

  handleSubmit(event) {
    this.props.onSubmit(
      {
        UUID: this.props.note.UUID,
        title: this.title.current.value,
        content: this.content.current.value
      },
      this.state.insertTags,
      this.state.removeTags
    );

    this.setState({ removeTags: [], insertTags: [] });
    event.preventDefault();
  }

  handleTagChange({ value }) {
    const previous = this.state.previousTags;
    const isInserting = previous ? value.length > previous.length : true;

    const insertTags = this.state.insertTags;
    const removeTags = this.state.removeTags;

    if (isInserting) {
      const toInsert = value[value.length - 1];

      if (removeTags.includes(toInsert)) {
      } else {
        insertTags.push(toInsert);
      }
    } else {
      const toRemove = previous.filter(x => !value.includes(x))[0]; //perhaps we can make one variable for isInserting and !isInserting and call it difference
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
    const { note, tagMap, onDelete } = this.props;
    const title = note.title;
    const content = note.content;
    const defaultTagsToDisplay = note.tagUUIDs.concat(this.state.insertTags);

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <textarea
            defaultValue={title}
            ref={this.title}
            placeholder="Give your note a title..."
          />
          <TagDropdown
            placeholder="Add tags to your note"
            tagMap={tagMap}
            defaultValue={defaultTagsToDisplay}
            onChange={(e, DropdownProps) => this.handleTagChange(DropdownProps)}
          />
          <textarea
            defaultValue={content}
            ref={this.content}
            placeholder="Enter content here..."
          />
          <Button icon>
            <Icon name="save" />
            Save
          </Button>
          <Button icon onClick={onDelete}>
            <Icon name="trash alternate" />
            Delete
          </Button>
        </Form>
      </div>
    );
  }
}

export default NoteEditor;
