import React, { Component } from "react";
import Board from "./Board";
import DeskHeader from "./DeskHeader";
import NotesOnDisplay from "./NotesOnDisplay";
import Tags from "./Tags";

//It seems like I'm passing the same constants to Board as well as to NotesOnDisplay. I wonder if theres a better way.
class DeskDisplay extends Component {
  render() {
    const { desk, functions } = this.props;
    const selectedBoard = desk.selectedBoard;
    const board = desk.boards[selectedBoard];
    const notes = desk.notes;
    const tags = desk.tags;

    return (
      <div>
        <DeskHeader functions={functions} desk={desk} />
        <Board board={board} functions={functions} />
        <Tags tags={tags} functions={functions} />
        <NotesOnDisplay
          functions={functions}
          notes={notes}
          tags={tags}
          selectedBoard={selectedBoard}
        />
      </div>
    );
  }
}

export default DeskDisplay;
