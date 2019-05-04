import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";

class Desk extends Component {
  constructor() {
    super();

    this.state = {
      currentContext: 0,
      contexts: [{ tags: [0, 1] }], //eventually context will be a set of tags
      tagObjects: [
        new Tag("tag1", [1, 2]),
        new Tag("tag2", [2, 3, 4]),
        new Tag("tag3", [4])
      ],
      noteObjects: [
        new Note("note1"),
        new Note("note2"),
        new Note("note3"),
        new Note("note4")
      ]
    };

    this.functions = {
      removeTagFromContext: this.removeTagFromContext.bind(this),
      setContextTags: this.setContextTags.bind(this)
    };
  }

  setContextTags(e, { value }) {
    const tags = value;
    var context = this.state.contexts;
    var currentContext = context[this.state.currentContext];
    currentContext.tags = tags;
    this.setState({ context: context });
  }

  //rename as well
  //kind of works. Will fix when I do sets
  removeTagFromContext(tagIndex) {
    var context = this.state.contexts;
    var currentContext = context[this.state.currentContext];
    currentContext.tags.splice(tagIndex, 1);
    this.setState({ context: context });
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay state={this.state} functions={functions} />;
  }
}

export default Desk;
