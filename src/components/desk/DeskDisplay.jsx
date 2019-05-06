import React, { Component } from "react";
import DeskHeader from "./DeskHeader";
import DeskSearch from "./DeskSearch";
import DeskContext from "./DeskContext";
import DeskItems from "./DeskItems";

//It seems like I'm passing the same constants to Board as well as to NotesOnDisplay. I wonder if theres a better way.
class DeskDisplay extends Component {
  render() {
    const { state, functions } = this.props;

    return (
      <div>
        UI
        <DeskHeader />
        <DeskItems state={state} functions={functions} />
        <DeskSearch state={state} functions={functions} />
      </div>
    );
  }
}

export default DeskDisplay;
