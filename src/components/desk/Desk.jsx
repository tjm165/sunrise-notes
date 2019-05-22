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
      setContextTags: this.setContextTags.bind(this), //used by DeskDisplay
      getContextNotes: this.getContextNotes.bind(this), //used by DeskNotes

      getAWSData: this.getAWSData.bind(this), //used by DeskHeader

      editNote: this.editNote.bind(this), //used by Note
      changeNoteTags: this.changeNoteTags.bind(this),
      changeNoteValue: this.changeNoteValue.bind(this), //used by Note
      getNoteTags: this.getNoteTags.bind(this), //used by NoteGroup

      saveNote: this.saveNote.bind(this) //used by Note
    };
  }

  //if the tag didn't exist before then you should add it
  setContextTags(value) {
    this.setState({ contextTags: value });
  }

  getContextNotes() {
    const contextTags = this.state.contextTags;
    var noteSet = new Set();

    var i;
    var j;
    var tag;
    var noteArray;
    for (i = 0; i < contextTags.length; i++) {
      //for each tag in contextTags
      tag = this.state.tagObjects[contextTags[i]];
      noteArray = tag.noteIndices;
      for (j = 0; j < noteArray.length; j++) {
        //for each note in noteArray
        noteSet.add(noteArray[j]);
      }
    }

    return noteSet;
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

  //A
  editNote(i_o) {
    const noteObjects = this.state.noteObjects; //get
    const noteObject = noteObjects[i_o]; //get
    noteObject.editing = true; //editing
    //unique

    this.setState({ noteObjects: noteObjects }); //save
  }

  //Right now it just sets the note tags. Not the note edit tags
  changeNoteTags(i_o, value) {
    const tags = value;
    const tagObjects = this.state.tagObjects;

    for (var i = 0; i < tags.length; i++) {
      tagObjects[tags[i]].noteIndices = [
        ...tagObjects[tags[i]].noteIndices,
        i_o
      ];
    }

    this.setState({ tagObjects: tagObjects });
  }

  //A
  changeNoteValue(i_o, value) {
    const noteObjects = this.state.noteObjects; //get
    const noteObject = noteObjects[i_o]; //get

    noteObject.editValue = value; //unique
    this.setState({ noteObjects: noteObjects }); //save
  }

  getNoteTags(i_o) {
    //search through every note in every tag to see if note == i_o and then put that tag in an aray and return the array
    const tags = this.state.tagObjects;
    var noteTags = [];

    for (var i = 0; i < tags.length; i++) {
      for (var j = 0; j < tags[i].noteIndices.length; j++) {
        if (tags[i].noteIndices[j] === i_o) {
          noteTags = [...noteTags, i];
        }
      }
    }

    return noteTags;
  }

  saveNote(i_o, save) {
    const noteObjects = this.state.noteObjects; //get
    const noteObject = noteObjects[i_o]; //get
    noteObject.editing = false; //editing
    if (save) {
      noteObject.applyEdits(); //unique
    } else {
      noteObject.resetEdits(); //unique
    }

    this.setState({ noteObjects: noteObjects }); //save
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay state={this.state} functions={functions} />;
  }
}

export default Desk;
