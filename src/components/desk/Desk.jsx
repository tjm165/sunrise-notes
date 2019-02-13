import React, { Component } from "react";
import DeskDisplay from "./DeskDisplay";
import NoteObject from "../../objects/NoteObject";

/**
 * Next steps:
 * 2. Refactor. Make this thing readable, and easy to modify. Use constructors, setters and getters.
 * 3. Make it feel like something you can draw.
 * 4. Figure out storage - Just want to store the state
 */
class Desk extends Component {
  constructor() {
    super();

    //maybe getters is a nice idea?
    this.state = {
      boards: [{ title: "vehicles", tags: [] }, { title: "uh", tags: [] }],
      selectedBoard: 0,
      notes: [
        new NoteObject("hello world", [1, 2, 3]),
        { value: "car 1 i = 0", tagIndices: [0, 1], noteToggleTag: 3 },
        { value: "car 2 i = 1", tagIndices: [], noteToggleTag: 1 },
        { value: "truck 1 i = 2", tagIndices: [], noteToggleTag: 0 },
        { value: "truck 2 i = 3", tagIndices: [], noteToggleTag: 0 },
        { value: "truck-car 1 i = 4", tagIndices: [], noteToggleTag: 0 },
        { value: "dog 0 i = 5", tagIndices: [], noteToggleTag: 0 },
        { value: "cat 0 i = 6", tagIndices: [], noteToggleTag: 0 }
      ],
      tags: [
        { value: "all", noteIndices: [0, 1, 2, 3, 4, 5, 6] },
        { value: "car", noteIndices: [0, 1, 4] },
        { value: "truck", noteIndices: [2, 3, 4] },
        { value: "dogs", noteIndices: [5] },
        { value: "cats", noteIndices: [6] }
      ],
      newTag: { value: "woop", noteIndices: [] },
      noteToggleTag: 0
    };

    this.functions = {
      deskAddNewTag: this.deskAddNewTag.bind(this),
      deskSetSelectedBoard: this.deskSetSelectedBoard.bind(this),
      deskNewNote: this.deskNewNote.bind(this),
      boardGetNoteIndices: this.boardGetNoteIndices.bind(this),

      tagSetValue: this.tagSetValue.bind(this),
      tagSelect: this.tagSelect.bind(this),

      noteToggleTag: this.noteToggleTag.bind(this),
      noteGetToggleTag: this.noteGetToggleTag.bind(this),
      noteSetToggleTag: this.noteSetToggleTag.bind(this),
      noteSetValue: this.noteSetValue.bind(this),
      noteGetValue: this.noteGetValue.bind(this),
      noteGetTagIndices: this.noteGetTagIndices.bind(this)
    };
  }

  noteToggleTag(noteIndex) {
    var notes = this.state.notes;
    var note = notes[noteIndex];
    const noteToggleTag = note.noteToggleTag;
    var tags = note.tagIndices;

    if (tags.includes(noteToggleTag)) {
      this.removeTag(tags, noteToggleTag);
    } else {
      this.addTag(tags, noteToggleTag);
    }

    this.setState({ notes: notes });
  }

  removeTag(tags, tagIndex) {
    tags.splice(tagIndex, 1);
  }

  addTag(tags, tagIndex) {
    return [tags.push(tagIndex)];
  }

  noteGetToggleTag(noteIndex) {
    const notes = this.state.notes;
    const note = notes[noteIndex];
    return note.noteToggleTag;
  }

  noteSetToggleTag(e) {
    const toggleIndex = parseInt(e.target.value);
    const noteIndex = e.target.getAttribute("index");

    var notes = this.state.notes;
    var note = notes[noteIndex];
    note.noteToggleTag = toggleIndex;

    this.setState({ notes: notes });
  }

  deskNewNote() {
    var notes = this.state.notes;
    var noteIndex = notes.length;
    alert(noteIndex);
    var tags = this.state.tags;
    var notesOfAllTag = tags[0].noteIndices;
    notes.push(new NoteObject("new note", [0]));
    notesOfAllTag.push(noteIndex);
    this.setState({ notes: notes, tags: tags });
  }

  //good
  tagSetValue(e) {
    console.log("hey");
    const index = e.target.getAttribute("index");
    var tags = this.state.tags;
    var tag = tags[index];
    tag.value = e.target.value;

    tags[index] = tag;
    this.setState({ tags: tags });
  }

  //good
  deskAddNewTag() {
    var tags = this.state.tags;
    const newTag = this.state.newTag;
    const newNewTag = { value: "woop", noteIndices: [] };
    tags.push(newTag);
    this.setState({ tags: tags, newTag: newNewTag });
  }

  //good
  tagSelect(tagIndex) {
    const selectedBoard = this.state.selectedBoard;
    var boards = this.state.boards;
    var board = boards[selectedBoard];
    var tags = board.tags;
    var tagObjects = this.state.tags;
    const indexOf = tags.indexOf(tagIndex);

    if (indexOf == -1) {
      tags.push(tagIndex);
    } else {
      tags.splice(indexOf, 1);
    }

    boards[selectedBoard] = board;

    this.setState({ boards: boards, tags: tagObjects });
  }

  //good
  noteSetValue(e) {
    const index = e.target.getAttribute("index");
    const newValue = e.target.value;
    var notes = this.state.notes;
    notes[index].value = newValue;
    this.setState({ notes: notes });
  }

  //good
  //we can make this state rn
  noteGetValue(noteIndex) {
    return this.state.notes[noteIndex].value;
  }

  noteGetTagIndices(noteIndex) {
    return this.state.notes[noteIndex].tagIndices;
  }

  //eventually make this state?
  //determines the notes to be displayed. Eventually this needs to change names from board to desk.
  boardGetNoteIndices(boardIndex) {
    const tagIndices = this.state.boards[boardIndex].tags;
    var tagToAdd;
    var noteIndicesToAdd;
    var notes = new Set();

    for (var i = 0; i < tagIndices.length; i++) {
      tagToAdd = this.state.tags[tagIndices[i]];
      noteIndicesToAdd = tagToAdd.noteIndices;

      for (var j = 0; j < noteIndicesToAdd.length; j++) {
        //right now it's union. This is where I'd make that change
        notes.add(noteIndicesToAdd[j]);
      }
    }

    return [...notes];
  }

  deskSetSelectedBoard(e) {
    const selectedBoard = e.target.value;
    this.setState({ selectedBoard: selectedBoard });
  }

  render() {
    const functions = this.functions;

    return <DeskDisplay desk={this.state} functions={functions} />;
  }
}

export default Desk;
