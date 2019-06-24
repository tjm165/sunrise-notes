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

export function fetchNote(UUID) {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/note?UUID=" +
    UUID;

  return fetch(ask)
    .then(response => response.json())
    .then(json => {
      return Note.deserialize(json);
    });
}

export function postNote(noteObject, insertTags, removeTags) {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/note";

  post(ask, { noteObject, insertTags, removeTags })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
}

function post(url = "", data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json()); // parses JSON response into native Javascript objects
}
