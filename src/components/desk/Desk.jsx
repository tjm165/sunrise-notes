import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";
import MySet from "../../objects/MySet";

//make enums for operations. 0 = union, 1 = intersection
class Desk extends Component {
  constructor() {
    super();

    this.state = {
      context: { operation: 0, tags: [], notes: new MySet() },
      tagMap: new Map(),
      noteMap: new Map([
        [-1, new Note("new note")],
        [20, new Note("Ford")],
        [21, new Note("Honda")],
        [22, new Note("Boeing")],
        [23, new Note("Airbus")],
        [24, new Note("Garfield")]
      ])
    };

    this.functions = {
      megamethod: this.megamethod.bind(this),
      fetchUserTags: this.fetchUserTags.bind(this), //used by DeskHeader

      editNote: this.editNote.bind(this), //used by Note
      changeNoteTags: this.changeNoteTags.bind(this),
      changeNoteValue: this.changeNoteValue.bind(this), //used by Note
      saveNote: this.saveNote.bind(this) //used by Note
    };
  }

  fetchUserTags = async => {
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
  };

  megamethod(tags) {
    const context = this.computeContextByTags(tags);
    this.fetchNotes(context.notes.params);
  }

  computeContextByTags(tags) {
    var context = this.state.context;
    context.tags = tags;
    context.notes = this.generateNoteSetByTags(tags);

    return context;
  }

  generateNoteSetByTags(tags) {
    const operation = this.state.context.operation;
    var setA = new MySet();
    var setB;

    tags.forEach(tag => {
      setB = new Set(this.state.tagMap.get(tag).noteUUIDs);
      setA = MySet.union(setA, setB);
    });

    return setA;
  }

  fetchNotes = async params => {
    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/notes?UUIDs=" +
      params;

    var noteMap = this.state.noteMap;

    fetch(ask)
      .then(response => response.json())
      .then(notes => {
        notes.forEach(note => {
          noteMap.set(note["UUID"], Note.deserialize(note));
        });
        this.setState({ noteMap: noteMap });
      });
  };

  //A //B
  editNote(key) {
    const noteMap = this.state.noteMap; //get
    const noteObject = noteMap.get(key); //get
    noteObject.editing = true; //editing
    //unique

    this.setState({ noteMap }); //save
  }

  //A //B
  editNewNote(key) {
    const noteMap = this.state.noteMap; //get
    const noteObject = noteMap.get(key); //get
    noteObject.editing = true; //editing
    //unique

    this.setState({ noteMap }); //save
  }

  //Right now it just sets the note tags. Not the note edit tags
  changeNoteTags(noteKey, newTagKeys) {
    const tagMap = this.state.tagMap;

    newTagKeys.forEach(tagKey => {
      var noteKeys = tagMap.get(tagKey).noteIndices;
      noteKeys = [...noteKeys, noteKey];
    });

    this.setState({ tagMap: tagMap });
  }

  //A
  changeNoteValue(noteKey, value) {
    const noteMap = this.state.noteMap; //get
    const noteObject = noteMap.get(noteKey); //get

    noteObject.editValue = value; //unique
    this.setState({ noteMap }); //save
  }

  saveNote(key, save) {
    const noteMap = this.state.noteMap; //get
    const noteObject = noteMap.get(key); //get
    noteObject.editing = false; //editing
    if (save) {
      noteObject.applyEdits(); //unique
    } else {
      noteObject.resetEdits(); //unique
    }

    this.setState({ noteMap: noteMap }); //save
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay state={this.state} functions={functions} />;
  }
}

export default Desk;
