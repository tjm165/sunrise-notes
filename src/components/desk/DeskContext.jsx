import React, { Component } from "react";
import Tag from "./Tag";

class DeskContext extends Component {
  render() {
    const { state, functions } = this.props;
    const tagsToRender = state.contexts[state.currentContext].tags;
    var i = 0;

    return (
      <div>
        Context:
        {tagsToRender.map(tag => (
          <Tag
            index_c={i++}
            index_o={tag}
            state={state}
            functions={functions}
          />
        ))}
      </div>
    );
  }
}

export default DeskContext;
