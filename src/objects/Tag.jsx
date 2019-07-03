import { NEW_INSTANCE_UUID } from "../API";

export default class Tag extends Set {
  constructor(
    title = "",
    noteUUIDs = "",
    rgb = { r: 0, g: 0, b: 0 },
    UUID = NEW_INSTANCE_UUID
  ) {
    super(noteUUIDs);
    this.title = title;
    this.rgb = rgb;
    this.UUID = UUID;
  }

  //hmm these should know their uuid too
  static deserialize(json) {
    return new Tag(json["title"], json["noteUUIDs"], json["rgb"], json["UUID"]);
  }
}
