import Note from "./objects/Note";
import Tag from "./objects/Tag";
import { Auth } from "aws-amplify";
import config from "./config";
export const NEW_INSTANCE_UUID = -1;
export const NO_INSTANCE_UUID = false;

const api = config.api.invokeUrl;
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2)
    return parts
      .pop()
      .split(";")
      .shift();
}

export function fetchNoteSet(tags) {
  var noteset = new Map();

  return GET(`note-set`, `?UUIDs=${tags}`)
    .then(response => response.json())
    .then(notes => {
      Object.entries(notes).forEach(([key, note]) => {
        noteset.set(key, Note.deserialize(note));
      });
      return noteset;
    });
}

export function signin(username, password) {
  return Auth.signIn(username, password).then(user => {
    console.log(user);
    document.cookie = `idToken=${user.signInUserSession.idToken.jwtToken}`;

    return true;
  });
}

//need to unhard code this soon!
export function fetchUserTags() {
  var tagMap = new Map();

  return GET(`tags`).then(json => {
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
  return POST(`tag`, { tagObject, userUUID })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
}

function GET(resource, querystring = null) {
  let ask = `${api}/${resource}/${querystring}`;

  // Default options are marked with *
  if (querystring === null) {
    ask = `${api}/${resource}`;
  }

  return fetch(ask, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("idToken")
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  }).then(response => response.json()); // parses JSON response into native Javascript objects
}

function post() {
  return "depreciated";
}

function POST(resource, data = {}) {
  const ask = `${api}/${resource}`;

  // Default options are marked with *
  return fetch(ask, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("idToken")
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
