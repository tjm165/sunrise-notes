export default class Tag extends Set {
  constructor(title, noteUUIDs, rgb) {
    super(noteUUIDs);
    this.title = title;
    this.rgb = rgb;
    this.hex = Tag.rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  //hmm these should know their uuid too
  static deserialize(json) {
    return new Tag(json["title"], json["noteUUIDs"], json["rgb"]);
  }

  static componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  static rgbToHex(r, g, b) {
    return (
      "#" +
      Tag.componentToHex(r) +
      Tag.componentToHex(g) +
      Tag.componentToHex(b)
    );
  }
}
