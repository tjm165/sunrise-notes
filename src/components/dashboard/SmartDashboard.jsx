import React, { Component } from "react";
import Dashboard from "./Dashboard";
import {
  fetchUserTags,
  fetchNoteSet,
  fetchNote,
  postNote,
  deleteNote,
  postTag,
  deleteTag
} from "../../API";
import Note from "../../objects/Note";
import { NEW_INSTANCE_UUID, NO_INSTANCE_UUID } from "../../API";
import Tag from "../../objects/Tag";

class SmartDashboard extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new Map() }, //note previews
      tagMap: new Map(),
      activeNote: new Note(),
      activeTag: false
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      fetchNoteSet: this.fetchNoteSet.bind(this),

      setAsActiveTag: this.setAsActiveTag.bind(this),
      submitNote: this.submitNote.bind(this),
      deleteNote: this.deleteNote.bind(this),
      setAsActiveNote: this.setAsActiveNote.bind(this),
      submitTag: this.submitTag.bind(this),
      deleteTag: this.deleteTag.bind(this)
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
    if (noteUUID === NEW_INSTANCE_UUID) {
      const note = new Note();
      note.insertTags = this.state.context.tags;
      this.setState({ activeNote: note });
    } else {
      fetchNote(noteUUID).then(note => {
        this.setState({ activeNote: note });
      });
    }
  }

  //this one is going to set the active as a UUID
  setAsActiveTag(tagUUID) {
    if (tagUUID === NO_INSTANCE_UUID) {
      this.setState({ activeTag: NO_INSTANCE_UUID });
    }
    if (tagUUID === NEW_INSTANCE_UUID) {
      this.setState({ activeTag: new Tag() });
    } else {
      const tag = this.state.tagMap.get(tagUUID);
      this.setState({ activeTag: tag }); //get the tag here
    }
  }

  submitNote(note, tagsToInsert, tagsToRemove) {
    postNote(note, tagsToInsert, tagsToRemove);
  }

  submitTag(tag) {
    postTag(tag, this.state.userUUID)
      .then(() => this.fetchUserTags())
      .then(() => this.fetchNoteSet(this.state.context.tags));
  }

  deleteTag(tagUUID) {
    deleteTag(tagUUID);
    const tagMap = this.state.tagMap;
    tagMap.delete(tagUUID);
    this.setState({ tagMap: tagMap });
  }

  deleteNote(noteUUID) {
    const context = this.state.context;
    context.notes.delete(noteUUID);
    this.setState({ context, activeNote: false });
    deleteNote(noteUUID);
  }

  render() {
    return <Dashboard state={this.state} functions={this.functions} />;
  }
}

export default SmartDashboard;
