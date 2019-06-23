export default class Note {
  constructor(title, content, tagUUIDs, UUID, rgb) {
    this.title = title;
    this.tagUUIDs = tagUUIDs;
    this.content = content;
    this.UUID = UUID;
    this.rgb = rgb;
  }

  static deserialize(json) {
    return new Note(
      json["title"],
      json["content"],
      json["tagUUIDs"],
      json["UUID"],
      json["rgb"]
    );
  }
}
