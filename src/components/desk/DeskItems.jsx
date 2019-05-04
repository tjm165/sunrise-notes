import React, { Component } from "react";
import Note from "./Note";

class DeskItems extends Component {
  render() {
    const { state, functions } = this.props;
    const tagsInCurrentContext = state.contexts[state.currentContext].tags;
    const gotti = Array.from(functions.getContextNotes());
    const notesToRender = [2, 1, 3];

    console.log(gotti);

    var i = 0;
    return (
      <div>
        Desk Items:
        {gotti.map(note => (
          <Note index_o={note} state={state} functions={functions} />
        ))}
      </div>
    );
  }
}

export default DeskItems;
