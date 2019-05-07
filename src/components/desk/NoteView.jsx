import React, { Component } from "react";
import { Card } from "../../../node_modules/semantic-ui-react";

class NoteView extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;

    return <Card.Content>{value}</Card.Content>;
  }
}

export default NoteView;
