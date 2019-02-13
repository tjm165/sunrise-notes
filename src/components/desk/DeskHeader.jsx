import React, { Component } from "react";

class DeskHeader extends Component {
  render() {
    const { functions, desk } = this.props;
    const boards = desk.boards;
    const selectedBoard = desk.selectedBoard;
    var boardIndex = 0;

    return (
      <div>
        DESK
        <button onClick={() => functions.deskAddNewTag()}>Add new tag</button>
        <button onClick={() => functions.deskNewNote()}>new note</button>
        <select value={selectedBoard} onChange={functions.deskSetSelectedBoard}>
          {boards.map(b => (
            <option value={boardIndex++}>{b.title}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default DeskHeader;
