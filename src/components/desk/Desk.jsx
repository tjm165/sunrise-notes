import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";
import { resolve } from "path";

//make enums for operations. 0 = union, 1 = intersection
class Desk extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new Tag() },
      tagMap: new Map(),
      noteMap: new Map()
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      megamethod: this.megamethod.bind(this)
    };
  }

  async fetchUserTags() {
    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/tags?UUID=testTommy";

    fetch(ask)
      .then(response => response.json())
      .then(json => {
        var tagMap = new Map();

        json.forEach(json => {
          tagMap.set(json["UUID"], Tag.deserialize(json));
        });

        this.setState({ tagMap: tagMap });
      });
  }

  async megamethod(tags) {
    var context = this.state.context;

    const { newTag, neededParams } = Tag.generateNewTag(
      context.notes,
      this.state.tagMap.get(tags[tags.length - 1]),
      context.operation
    );

    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/notes?UUIDs=" +
      neededParams;
    var noteMap = this.state.noteMap;

    fetch(ask)
      .then(response => response.json())
      .then(notes => {
        notes.forEach(note => {
          noteMap.set(note["UUID"], Note.deserialize(note));
        });
        this.setState({ noteMap: noteMap });
      })
      .then(() => {
        context.tags = tags;
        context.notes = newTag;

        this.setState({ context: context });
      });
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay state={this.state} functions={functions} />;
  }
}

export default Desk;
