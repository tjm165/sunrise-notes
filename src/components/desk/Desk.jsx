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
      setContextTags: this.setContextTags.bind(this), //used by DeskDisplay
      getContextNotes: this.getContextNotes.bind(this), //used by DeskNotes
      getAWSData: this.getAWSData.bind(this), //used by DeskHeader
      editNote: this.editNote.bind(this), //used by Note
      setNoteEditValue: this.setNoteEditValue.bind(this), //used by Note
      setNoteEditTags: this.setNoteEditTags.bind(this),
      finishNoteEdit: this.finishNoteEdit.bind(this), //used by Note
      getTagsForNote: this.getTagsForNote.bind(this) //used by NoteGroup
    };

    this.test = this.test.bind(this);
  }

  test() {
    console.log("test");
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

  //if the tag didn't exist before then you should add it
  setContextTags(e, { value }) {
    const tags = value;
    const context = this.state.contexts;
    const currentContext = context[this.state.currentContext];
    currentContext.tags = tags;
    this.setState({ context: context });
  }

  //Right now it just sets the note tags. Not the note edit tags
  setNoteEditTags(i_o, e) {
    console.log("value " + e.value);

    const tags = e.value;
    const tagObjects = this.state.tagObjects;

    for (var i = 0; i < tags.length; i++) {
      tagObjects[tags[i]].noteIndices = [
        ...tagObjects[tags[i]].noteIndices,
        i_o
      ];
    }

    this.setState({ tagObjects: tagObjects });
  }

  getTagsForNote(i_o) {
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

  //A
  editNote(i_o) {
    const noteObjects = this.state.noteObjects; //get
    const noteObject = noteObjects[i_o]; //get
    noteObject.editing = true; //editing
    //unique

    this.setState({ noteObjects: noteObjects }); //save
  }

  //A
  setNoteEditValue(i_o, e) {
    const noteObjects = this.state.noteObjects; //get
    const noteObject = noteObjects[i_o]; //get

    noteObject.editValue = e.value; //unique
    this.setState({ noteObjects: noteObjects }); //save
  }

  finishNoteEdit(i_o, save) {
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

  toggleNoteInContext(context_i, note_i, insert) {
    //int, int, bool
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
