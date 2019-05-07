import React, { Component } from "react";
import { Card, Form, TextArea } from "../../../node_modules/semantic-ui-react";
import { Container } from "semantic-ui-react";
import NoteView from "./NoteView";
import NoteEdit from "./NoteEdit";

class Note extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;
    var component;

    if (index_o === state.focusedNote) {
      component = (
        <NoteEdit index_o={index_o} state={state} functions={functions} />
      );
    } else {
      component = (
        <NoteView index_o={index_o} state={state} functions={functions} />
      );
    }

    return (
      <Card onClick={i => functions.setFocusedNote(index_o)}>{component}</Card>
    );
  }
}
export default Note;
