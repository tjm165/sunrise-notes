import React, { Component } from "react";
import { Card } from "../../../node_modules/semantic-ui-react";

class Note extends Component {
  render() {
    const { index_o, state, functions } = this.props;
    const value = state.noteObjects[index_o].value;

    return <Card text>{value}</Card>;
  }
}

export default Note;
