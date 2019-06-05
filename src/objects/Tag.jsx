export default class Tag extends Set {
  constructor(title, noteUUIDs) {
    super(noteUUIDs);
    this.title = title;
  }

  //generate combined tag?
  static generateNewTag(tagA, tagB, op) {
    //if op is Union
    return Tag._generateUnion(tagA, tagB);
  }

  static _generateUnion(tagA, tagB) {
    var name =
      tagA.title === undefined
        ? tagB.title
        : tagA.title + " union " + tagB.title;

    var _union = new Tag(name, tagA);
    var neededParams = "";
    for (var elem of tagB) {
      neededParams += tagA.has(elem) ? "" : elem + ",";
      _union.add(elem);
    }
    neededParams = neededParams.substring(0, neededParams.length - 1);

    return { newTag: _union, neededParams: neededParams };
  }

  static deserialize(json) {
    return new Tag(json["title"], json["noteUUIDs"]);
  }
}
