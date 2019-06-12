import React, { Component } from "react";
import NoteEditorDisplay from "./NoteEditorDisplay";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note,
      uuid: props.g
    };

    this.functions = {
      setTitle: this.setTitle.bind(this),
      setContent: this.setContent.bind(this),
      save: props.save,
      close: props.close
    };
  }

  setTitle(value) {
    const note = this.state.note;
    note.title = value;
    this.setState({ note: note });
  }

  setContent(value) {
    const note = this.state.note;
    note.content = value;
    this.setState({ note: note });
  }

  render() {
    return (
      <>
        {this.state.uuid}
        <NoteEditorDisplay note={this.state.note} functions={this.functions} />
      </>
    );
  }
}

export default NoteEditor;
