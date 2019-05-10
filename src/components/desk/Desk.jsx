import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import Tag from "../../objects/Tag";
import Note from "../../objects/Note";

class Desk extends Component {
  constructor() {
    super();

    this.state = {
      currentContext: 0,
      awsdata: null,
      focusedNote: -1,
      contexts: [{ tags: [] }], //eventually context will be a set of tags
      tagObjects: [
        new Tag("cars", [0, 1]),
        new Tag("planes", [2, 3]),
        new Tag("vehicles", [0, 1, 2, 3]),
        new Tag("cats", [4])
      ],
      noteObjects: [
        new Note("Ford"),
        new Note("Honda"),
        new Note("Boeing"),
        new Note("Airbus"),
        new Note("Garfield")
      ]
    };

    this.functions = {
      setContextTags: this.setContextTags.bind(this),
      getContextNotes: this.getContextNotes.bind(this),
      getAWSData: this.getAWSData.bind(this),
      setFocusedNoteTags: this.setFocusedNoteTags.bind(this),
      editNote: this.editNote.bind(this),
      cancelNote: this.cancelNote.bind(this),
      saveNote: this.saveNote.bind(this),
      setNoteEditValue: this.setNoteEditValue.bind(this)
    };
  }

  getAWSData = async e => {
    e.preventDefault();

    const ask =
      "https://jeebrshgt6.execute-api.us-east-2.amazonaws.com/production/userdata?userId=1";

    const api_call = await fetch(ask);
    const data = await api_call.json();

    var tagObjects = [];

    for (var i = 0; i < data.length; i++) {
      tagObjects[i] = new Tag(data[i]["value"], data[i]["noteIndexes"]);
    }

    this.setState({ tagObjects: tagObjects });
  };

  setContextTags(e, { value }) {
    const tags = value;
    const context = this.state.contexts;
    const currentContext = context[this.state.currentContext];
    currentContext.tags = tags;
    this.setState({ context: context });
  }

  setFocusedNoteTags(e, { value }) {
    alert("hello");
  }

  setFocusedNote(i_o) {
    this.setState({ focusedNote: i_o });
  }

  //A
  editNote(i_o) {
    const noteObjects = this.state.noteObjects;
    const noteObject = noteObjects[i_o];
    noteObject.editing = true;

    this.setState({ noteObjects: noteObjects });
  }

  //A
  cancelNote(i_o) {
    const noteObjects = this.state.noteObjects;
    const noteObject = noteObjects[i_o];
    noteObject.editing = false;
    noteObject.resetEdits();

    this.setState({ noteObjects: noteObjects });
  }

  //A
  saveNote(i_o) {
    const noteObjects = this.state.noteObjects;
    const noteObject = noteObjects[i_o];
    noteObject.editing = false;
    noteObject.applyEdits();

    this.setState({ noteObjects: noteObjects });
  }

  //A
  setNoteEditValue(i_o, e) {
    const noteObjects = this.state.noteObjects;
    const noteObject = noteObjects[i_o];

    noteObject.editValue = e.value;
    this.setState({ noteObjects: noteObjects });
  }

  //renaming and make it consise
  //perhaps we can save the contextNotes to the state so it's faster
  getContextNotes() {
    //it would be cool to make a getCurrentContext helper
    const context = this.state.contexts;
    const currentContext = context[this.state.currentContext];
    const tagArray = currentContext.tags;
    var noteSet = new Set();

    //for each tag in tagArray
    //for each note in the tag
    //noteSet.add(tag.noteIndices)

    var i;
    var j;
    var tag;
    var noteArray;
    for (i = 0; i < tagArray.length; i++) {
      //for each tag in tagArray
      tag = this.state.tagObjects[tagArray[i]];
      noteArray = tag.noteIndices;
      for (j = 0; j < noteArray.length; j++) {
        //for each note in noteArray
        noteSet.add(noteArray[j]);
        console.log("just added note: " + this.state.noteObjects[j].value);
      }
      console.log("just added all the notes from tag " + i);
    }

    return noteSet;
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay state={this.state} functions={functions} />;
  }
}

export default Desk;
