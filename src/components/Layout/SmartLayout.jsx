import React, { Component } from "react";
import Layout from "./Layout";
import {
  fetchUserTags,
  fetchNoteSet,
  fetchNote,
  postNote,
  postTag,
  deleteNote
} from "../../API";
import Note from "../../objects/Note";

class SmartLayout extends Component {
  constructor() {
    super();

    this.state = {
      userUUID: "testTommy",
      context: { operation: 0, tags: [], notes: new Map() }, //note previews
      tagMap: new Map(),
      activeNote: new Note(),
      activeTag: false
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      fetchNoteSet: this.fetchNoteSet.bind(this),

      setAsActiveTag: this.setAsActiveTag.bind(this),
      deleteNote: this.deleteNote.bind(this),
      setAsActiveNote: this.setAsActiveNote.bind(this),
      submitActiveNote: this.submitActiveNote.bind(this),
      submitActiveTag: this.submitActiveTag.bind(this)
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

    if (tags.length === 0) {
      this.setState({ context: context });
    } else {
      fetchNoteSet(tags).then(notes => {
        context.notes = notes;
        this.setState({ context: context });
      });
    }
  }

  ///Work on making this one set the active as a UUID
  setAsActiveNote(noteUUID) {
    if (noteUUID !== 0) {
      fetchNote(noteUUID).then(note => {
        this.setState({ activeNote: note });
      });
    } else {
      const note = new Note();
      this.setState({ activeNote: note });
    }
  }

  //this one is going to set the active as a UUID
  setAsActiveTag(tagUUID) {
    this.setState({ activeTag: tagUUID });
  }

  submitActiveNote(activeNote, insertTags, removeTags) {
    postNote(activeNote, insertTags, removeTags);
  }

  submitActiveTag(activeNote) {
    const userUUID = this.state.userUUID;
    postNote(activeNote, userUUID);
  }

  deleteNote(noteUUID) {
    const context = this.state.context;
    context.notes.delete(noteUUID);
    deleteNote(noteUUID);

    this.setState({ context, activeNote: false });
  }

  render() {
    return <Layout state={this.state} functions={this.functions} />;
  }
}

export default SmartLayout;
