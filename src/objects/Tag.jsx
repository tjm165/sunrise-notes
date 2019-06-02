export default class Tag extends Set {
  constructor(value, noteUUIDs) {
    super(noteUUIDs);
    this.value = value;
  }

  //generate combined tag?
  static generateNewTag(tagA, tagB, op) {
    //if op is Union
    return Tag._generateUnion(tagA, tagB);
  }

  static _generateUnion(tagA, tagB) {
    var name =
      tagA.value === undefined
        ? tagB.value
        : tagA.value + " union " + tagB.value;

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
    return new Tag(json["value"], json["noteUUIDs"]);
  }
}
