import React, { Component } from "react";

class Board extends Component {
  render() {
    const { board, functions } = this.props;

    const title = board.title;

    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default Board;
