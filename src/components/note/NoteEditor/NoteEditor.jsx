import React, { Component } from "react";
import NoteEditorDisplay from "./NoteEditorDisplay";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note
    };

    this.functions = {
      setTitle: this.setTitle.bind(this),
      save: props.save
    };
  }

  setTitle(value) {
    const note = this.state.note;
    note.title = value;
    this.setState({ note: note });
  }

  render() {
    return (
      <NoteEditorDisplay note={this.state.note} functions={this.functions} />
    );
  }
}

export default NoteEditor;
