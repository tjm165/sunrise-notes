import React, { Component } from "react";

class Note extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;

    return <div>{value}</div>;
  }
}

export default Note;
