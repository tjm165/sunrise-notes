import React, { Component } from "react";
import Note from "./Note";

class DeskItems extends Component {
  render() {
    const { state, functions } = this.props;
    const tagsInCurrentContext = state.contexts[state.currentContext].tags;
    const notesToRender = [1, 2, 3];

    var i = 0;
    return (
      <div>
        Desk Items:
        {notesToRender.map(note => (
          <Note index_o={i++} state={state} functions={functions} />
        ))}
      </div>
    );
  }
}

export default DeskItems;
