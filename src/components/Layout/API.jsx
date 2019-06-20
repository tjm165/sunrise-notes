import Note from "../../objects/Note";
import Tag from "../../objects/Tag";

export function fetchNoteSet(tags) {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/note-set?UUIDs=" +
    tags;

  var noteset = new Map();

  return fetch(ask)
    .then(response => response.json())
    .then(notes => {
      Object.entries(notes).forEach(([key, note]) => {
        noteset.set(key, Note.deserialize(note));
      });
      return noteset;
    });
}

export function fetchUserTags() {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/tags?UUID=testTommy";
  var tagMap = new Map();

  return fetch(ask)
    .then(response => response.json())
    .then(json => {
      json.forEach(json => {
        tagMap.set(json["UUID"], Tag.deserialize(json));
      });
      return tagMap;
    });
}
