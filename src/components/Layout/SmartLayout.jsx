import React, { Component } from "react";
import Layout from "./Layout";
import {
  fetchUserTags,
  fetchNoteSet,
  fetchNote,
  postNote,
  deleteNote
} from "../../API";
import Note from "../../objects/Note";
import Tag from "../../objects/Tag";

class SmartLayout extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new Map() }, //note previews
      tagMap: new Map(),
      activeNote: new Note(),
      activeTag: new Tag()
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      fetchNoteSet: this.fetchNoteSet.bind(this),

      deleteNote: this.deleteNote.bind(this),
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

    if (tags.length === 0) {
      this.setState({ context: context });
    } else {
      fetchNoteSet(tags).then(notes => {
        context.notes = notes;
        this.setState({ context: context });
      });
    }
  }

  //name?
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

  submitActiveNote(activeNote, insertTags, removeTags) {
    postNote(activeNote, insertTags, removeTags);
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
