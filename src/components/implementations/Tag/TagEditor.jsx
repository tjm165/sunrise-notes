import React, { Component } from "react";
import { Form, TextArea } from "semantic-ui-react";

class TagEditor extends Component {
  constructor(props) {
    super(props);
    this.title = this.props.tag.title;
  }

  handleSubmit(event) {
    this.props.onSubmit({
      UUID: this.props.tag.UUID,
      title: this.title.current.value
    });

    event.preventDefault();
  }

  render() {
    return (
      <Form>
        <TextArea />
      </Form>
    );
  }
}

export default TagEditor;
