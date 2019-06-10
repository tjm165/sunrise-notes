import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";

//make enums for operations. 0 = union, 1 = intersection
class Desk extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new Set() },
      tagMap: new Map(),
      noteMap: new Map([[-1, new Note("new note", "content", null)]]),
      editNoteUUID: -1
    };

    this.functions = {
      fetchUserTags: this.fetchUserTags.bind(this),
      fetchNoteSet: this.fetchNoteSet.bind(this),

      noteFunctions: {
        selectNoteToEdit: this.selectNoteToEdit.bind(this),
        closeEditNote: this.closeEditNote.bind(this),
        saveEditNote: this.saveEditNote.bind(this)
      }
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

  async fetchNoteSet(tags) {
    var noteMap = this.state.noteMap;
    var context = this.state.context;
    context.tags = tags;
    context.notes = new Set();

    if (tags.length == 0) {
      this.setState({ noteMap: noteMap });
      this.setState({ context: context });
    }

    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/note-set?UUIDs=" +
      tags;

    fetch(ask)
      .then(response => response.json())
      .then(notes => {
        notes.forEach(note => {
          noteMap.set(note["UUID"], Note.deserialize(note));
          context.notes.add(note["UUID"]);
        });
        this.setState({ noteMap: noteMap });
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

  selectNoteToEdit(noteUUID) {
    this.setState({ editNoteUUID: noteUUID });
  }

  closeEditNote() {
    this.setState({ editNoteUUID: -1 });
  }

  async saveEditNote(editNote) {
    //need to make a POST call
    const noteMap = this.state.noteMap;
    const editNoteUUID = this.state.editNoteUUID;
    noteMap.set(editNoteUUID, editNote);
    this.setState({ noteMap: noteMap });

    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/notes";

    this.postData(ask, { ...editNote, UUID: editNoteUUID })
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  }

  render() {
    return <DeskDisplay state={this.state} functions={this.functions} />;
  }
}

export default Desk;
