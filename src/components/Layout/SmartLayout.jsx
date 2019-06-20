import React, { Component } from "react";
import Layout from "./Layout";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";
import { fetchUserTags, fetchNoteSet } from "./API";

class SmartLayout extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new Map() },
      tagMap: new Map(),
      activeNoteUUID: null
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      fetchNoteSet: this.fetchNoteSet.bind(this),

      setAsActiveNote: this.setAsActiveNote.bind(this),
      closeActiveNote: this.closeActiveNote.bind(this),
      submitActiveNote: this.submitActiveNote.bind(this)
    };
  }

  fetchUserTags() {
    fetchUserTags().then(tagMap => {
      this.setState({ tagMap: tagMap });
    });
  }

  fetchNoteSet(tags) {
    var context = this.state.context;
    context.tags = tags;
    context.notes = new Map();

    fetchNoteSet(tags).then(notes => {
      context.notes = notes;
      this.setState({ context: context });
    });
  }

  //should import this function
  postData(url = "", data = {}) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses JSON response into native Javascript objects
  }

  setAsActiveNote(noteUUID) {
    this.setState({ activeNoteUUID: noteUUID });
  }

  closeActiveNote() {
    this.setState({ activeNoteUUID: -1 });
  }

  async submitActiveNote(activeNote) {
    console.log(activeNote);

    const noteMap = this.state.noteMap;
    const activeNoteUUID = this.state.activeNoteUUID;
    noteMap.set(activeNoteUUID, activeNote);
    this.setState({ noteMap: noteMap });

    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/notes";

    this.postData(ask, { ...activeNote, UUID: activeNoteUUID })
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  }

  render() {
    return <Layout state={this.state} functions={this.functions} />;
  }
}

export default SmartLayout;
