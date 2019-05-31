export default class Tag {
  constructor(value, noteUUIDs) {
    this.value = value;
    this.noteUUIDs = new Set(noteUUIDs);
  }

  static deserialize(json) {
    return new Tag(json["value"], json["noteUUIDs"]);
  }
}
