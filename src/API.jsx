import Note from "./objects/Note";
import Tag from "./objects/Tag";

export const NEW_INSTANCE_UUID = -1;

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

//need to unhard code this soon!
export function fetchUserTags(userUUID) {
  const ask = `https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/tags?UUID=${userUUID}`;
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

export function deleteNote(UUID) {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/note?UUID=" +
    UUID;

  return DELETE(ask);
}

export function deleteTag(UUID) {}

export function postNote(noteObject, tagsToInsert, tagsToRemove) {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/note";

  return post(ask, { noteObject, tagsToInsert, tagsToRemove })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
}

export function postTag(tagObject, userUUID) {
  const ask =
    "https://e2y5q3r1l1.execute-api.us-east-2.amazonaws.com/production/tag";
  return post(ask, { tagObject, userUUID })
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

function DELETE(url = "", params = "") {
  return fetch(url + params, { method: "DELETE" }).then(response =>
    response.json()
  );
}
