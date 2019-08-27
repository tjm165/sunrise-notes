import React, { Component } from "react";
import Dashboard from "./Dashboard";
import {
  fetchUserTags,
  fetchNoteSet,
  fetchNote,
  postNote,
  deleteNote,
  postTag,
  deleteTag,
  NEW_INSTANCE_UUID,
  NO_INSTANCE_UUID
} from "../../../API";

class SmartDashboard extends Component {
  constructor() {
    super();

    this.state = {
      tagMap: new Map(),
      noteMap: new Map(),
      activeNote: NO_INSTANCE_UUID,
      activeTag: NO_INSTANCE_UUID, //now it's the tag that's open
      isLoading: {
        fetchUserTags: false,
        fetchNoteSet: false,
        setAsActiveNote: false,
        submitNote: false,
        submitTag: false,
        deleteTag: false,
        deleteNote: false
      }
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
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, fetchUserTags: true }
    }));

    fetchUserTags().then(tagMap => {
      this.setState({ tagMap: tagMap });

      this.setState(prevState => ({
        isLoading: { ...prevState.isLoading, fetchUserTags: false }
      }));
    });
  }

  //name?
  fetchNoteSet(tags) {
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, fetchNoteSet: true }
    }));

    var context = this.state.context;
    context.tags = tags;
    context.notes = new Map();

    if (tags.length === 0) {
      this.setState({ context: context });
    } else {
      fetchNoteSet(null, tags, null).then(notes => {
        context.notes = notes;
        this.setState({ context: context });
        this.setState(prevState => ({
          isLoading: { ...prevState.isLoading, fetchNoteSet: false }
        }));
      });
    }
  }

  ///Work on making this one set the active as a UUID
  setAsActiveNote(noteUUID, version = "withNoTags") {
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, setAsActiveNote: true }
    }));

    if (noteUUID === NO_INSTANCE_UUID) {
      this.setState({ activeNote: NO_INSTANCE_UUID });
    } else if (noteUUID === NEW_INSTANCE_UUID && version === "withNoTags") {
      const note = { UUID: noteUUID };
      this.setState({ activeNote: note });
    } else if (
      noteUUID === NEW_INSTANCE_UUID &&
      version === "withContextTags"
    ) {
      const note = { UUID: noteUUID };
      note.tagUUIDs = this.state.context.tags;
      this.setState({ activeNote: note, tagUUIDs: this.state.tags });
    } else {
      fetchNote(noteUUID).then(note => {
        this.setState({ activeNote: note });
      });
    }

    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, setAsActiveNote: false }
    }));
  }

  //this one is going to set the active as a UUID
  setAsActiveTag(tagUUID, newTitle = null) {
    if (tagUUID === NO_INSTANCE_UUID) {
      this.setState({ activeTag: NO_INSTANCE_UUID });
    } else if (tagUUID === NEW_INSTANCE_UUID) {
      this.setState({
        activeTag: {
          UUID: tagUUID,
          title: newTitle,
          rgb: { r: 255, g: 105, b: 0 }
        }
      });
    } else {
      const tag = this.state.tagMap.get(tagUUID);
      this.setState({ activeTag: tag }); //get the tag here
    }
  }

  submitNote(note, tagsToInsert, tagsToRemove) {
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, submitNote: true }
    }));
    postNote(note, tagsToInsert, tagsToRemove).then(() => {
      this.setState(prevState => ({
        isLoading: { ...prevState.isLoading, submitNote: false }
      }));
      this.fetchNoteSet(this.state.context.tags);
    });
  }

  submitTag(tag) {
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, submitTag: true }
    }));
    postTag(tag, this.state.userUUID)
      .then(() => this.fetchUserTags())
      .then(() => {
        this.fetchNoteSet(this.state.context.tags);
        this.setState({ activeTag: NO_INSTANCE_UUID });

        this.setState(prevState => ({
          isLoading: { ...prevState.isLoading, submitTag: false }
        }));
      });
  }

  deleteTag(tagUUID) {
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, deleteTag: true }
    }));

    const tagMap = this.state.tagMap;
    tagMap.delete(tagUUID);
    deleteTag(tagUUID).then(() => {
      this.setState({ activeTag: NO_INSTANCE_UUID, tagMap: tagMap });

      this.setState(prevState => ({
        isLoading: { ...prevState.isLoading, deleteTag: false }
      }));
    });
  }

  deleteNote(noteUUID) {
    this.setState(prevState => ({
      isLoading: { ...prevState.isLoading, deleteNote: true }
    }));
    const context = this.state.context;
    context.notes.delete(noteUUID);
    deleteNote(noteUUID).then(() => {
      this.setState({ context, activeNote: false });
      this.setState(prevState => ({
        isLoading: { ...prevState.isLoading, deleteNote: false }
      }));
    });
  }

  render() {
    return <Dashboard state={this.state} functions={this.functions} />;
  }
}

export default SmartDashboard;
