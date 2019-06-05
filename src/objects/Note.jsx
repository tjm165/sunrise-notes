export default class Note {
  constructor(title, content, tagUUIDs) {
    this.title = title;
    this.tagUUIDs = tagUUIDs;
    this.content = content;
  }

  static deserialize(json) {
    return new Note(json["title"], json["content"], json["tagUUIDs"]);
  }
}
