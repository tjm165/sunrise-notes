import React, { Component } from "react";
import Layout from "./Layout";
import { fetchUserTags, fetchNoteSet, fetchNote, postNote } from "./API";

class SmartLayout extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new Map() }, //note previews
      tagMap: new Map(),
      activeNote: null
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      fetchNoteSet: this.fetchNoteSet.bind(this),

      setAsActiveNote: this.setAsActiveNote.bind(this),
      submitActiveNote: this.submitActiveNote.bind(this)
    };
  }

  //name?
  fetchUserTags() {
    fetchUserTags().then(tagMap => {
      this.setState({ tagMap: tagMap });
    });
  }

  //name?
  fetchNoteSet(tags) {
    var context = this.state.context;
    context.tags = tags;
    context.notes = new Map();

    fetchNoteSet(tags).then(notes => {
      context.notes = notes;
      this.setState({ context: context });
    });
  }

  //name?
  setAsActiveNote(noteUUID) {
    fetchNote(noteUUID).then(note => {
      //note["UUID"] = noteUUID;
      this.setState({ activeNote: note });
    });
  }

  submitActiveNote(activeNote, insertTags, removeTags) {
    postNote(activeNote, insertTags, removeTags);
  }

  render() {
    return <Layout state={this.state} functions={this.functions} />;
  }
}

export default SmartLayout;
