import React, { Component } from "react";

class Tag extends Component {
  render() {
    const { index_c, index_o, state, functions } = this.props;
    const value = state.tagObjects[index_o].value;

    return (
      <button onClick={() => functions.removeTagFromContext(index_c)}>
        {value}
      </button>
    );
  }
}

export default Tag;
