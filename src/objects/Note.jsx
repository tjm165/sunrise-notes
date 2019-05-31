export default class Note {
  constructor(value, tagUUIDs) {
    this.editing = false;
    this.value = value;
    this.tagUUIDs = tagUUIDs;
  }

  getValue = function() {
    if (this.editing) {
      return this.editValue;
    } else {
      return this.value;
    }
  };

  applyEdits = function() {
    this.value = this.editValue;
  };

  resetEdits = function() {
    this.editValue = this.value;
  };

  static deserialize(json) {
    return new Note(json["value"], json["tagUUIDs"]);
  }
}
