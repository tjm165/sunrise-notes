import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";

class Desk extends Component {
  constructor() {
    super();

    this.state = {
      awsdata: null,
      contextTags: [], //eventually context will be a set of tags
      tagMap: new Map([
        [30, new Tag("cars", [20, 21])],
        [31, new Tag("planes", [22, 23])],
        [32, new Tag("vehicles", [20, 21, 22, 23])],
        [33, new Tag("cats", [4])]
      ]),
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
      setContextTags: this.setContextTags.bind(this), //used by DeskDisplay
      getContextNotes: this.getContextNotes.bind(this), //used by DeskNotes

      AWS_signIn: this.AWS_signIn.bind(this), //used by DeskHeader

      editNote: this.editNote.bind(this), //used by Note
      changeNoteTags: this.changeNoteTags.bind(this),
      changeNoteValue: this.changeNoteValue.bind(this), //used by Note
      getNoteTags: this.getNoteTags.bind(this), //used by NoteGroup

      saveNote: this.saveNote.bind(this), //used by Note
      deleteNote: this.deleteNote.bind(this),
      saveNewNote: this.saveNewNote.bind(this)
    };
  }

  //if the tag didn't exist before then you should add it
  setContextTags(value) {
    this.setState({ contextTags: value });
  }

  getContextNotes() {
    const contextTags = this.state.contextTags;
    const tagMap = this.state.tagMap;
    var noteSet = new Set();

    contextTags.forEach(tagKey => {
      var noteKeys = tagMap.get(tagKey).noteIndices;
      noteKeys.forEach(noteKey => {
        noteSet.add(noteKey);
      });
    });

    return noteSet;
  }

  AWS_signIn = async e => {
    e.preventDefault();

    const UUID = "4ece6ae1f9584a7c897d3b0faa15076c";

    const ask =
      "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/tags?UUID=4ece6ae1f9584a7c897d3b0faa15076c";

    fetch(ask)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        var tagMap = new Map();
        tagMap[UUID] = new Tag(myJson["value"], myJson["noteIndexes"]);

        //this.setState({ tagMap: tagMap });
      });

    //   const api_call = await fetch(ask);
    // const data = await api_call.json();

    // var tagMap = [];

    // tagMap[UUID] = new Tag(data["value"], data["noteIndexes"]);

    // this.setState({ tagMap: tagMap });
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

  getNoteTags(key) {
    const tags = this.state.tagMap;
    var noteTags = [];

    //brute force
    [...tags.keys()].forEach(tagKey => {
      var noteKeys = tags.get(tagKey).noteIndices;
      noteKeys.forEach(noteKey => {
        if (noteKey === key) noteTags = [...noteTags, tagKey];
      });
    });

    return noteTags;
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

  deleteNote(key) {
    alert("delete");
  }

  editNewNote() {
    alert("edit new note");
  }

  //rename to createNote
  saveNewNote() {
    alert("save new note");
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay state={this.state} functions={functions} />;
  }
}

export default Desk;
