import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Note extends Component {
  render() {
    const { note } = this.props;
    const title = note.title;
    const content = note.content;
    const rgb = note.rgb;
    const rgbString = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

    return (
      <>
        <Icon name="sticky note" style={{ color: rgbString }} />
        {title}
        {content}
      </>
    );
  }
}
export default Note;
//        style={{color: rgbString}}
