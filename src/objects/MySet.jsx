export default class MySet extends Set {
  constructor(myset) {
    super(myset);
    if (myset !== undefined && !myset.isMySet) {
      throw "set is not a valid MySet";
    }
    this.params = myset == undefined || myset.size == 0 ? "" : myset.params;
    this.isMySet = true;
  }

  add(elem) {
    if (this.has(elem)) return;
    super.add(elem);
    this.params += this.size == 1 ? elem : "," + elem;
  }

  static union(mySet, setB) {
    var _union = new MySet(mySet);
    for (var elem of setB) {
      _union.add(elem);
    }
    return _union;
  }
}
