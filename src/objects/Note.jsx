export default class Note {
  constructor(title, content, tagUUIDs, UUID) {
    this.title = title;
    this.tagUUIDs = tagUUIDs;
    this.content = content;
    this.UUID = UUID;
  }

  static deserialize(json) {
    return new Note(
      json["title"],
      json["content"],
      json["tagUUIDs"],
      json["UUID"]
    );
  }
}
