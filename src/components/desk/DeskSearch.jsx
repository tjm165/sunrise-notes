import React, { Component } from "react";

class DeskSearch extends Component {
  render() {
    const { functions } = this.props;

    return (
      <div>
        DeskSearch
        <button onClick={() => functions.addTagToContext(2)}>
          Add tag3 to context
        </button>
      </div>
    );
  }
}

export default DeskSearch;
