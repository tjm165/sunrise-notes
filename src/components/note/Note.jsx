import React, { Component } from "react";

class Note extends Component {
  render() {
    const { index, functions, note, tags } = this.props;
    var tagIndex = 0;

    return (
      <li>
        <p id="value">
          Value:
          <input
            type="text"
            value={functions.noteGetValue(index)}
            onChange={functions.noteSetValue}
            index={index}
          />
        </p>

        <p id="tags">
          tags:
          {note.tagIndices.map(t => (
            <span key={t / index}> {t}</span>
          ))}
        </p>

        <p id="toggleTag">
          Toggle Tag:
          <select
            index={index}
            value={functions.noteGetToggleTag(index)}
            onChange={functions.noteSetToggleTag}
          >
            {tags.map(t => (
              <option value={tagIndex++}>{t.value}</option>
            ))}
          </select>
          <button onClick={() => functions.noteToggleTag(index)}>
            Toggle this tag
          </button>
        </p>
      </li>
    );
  }
}

export default Note;
