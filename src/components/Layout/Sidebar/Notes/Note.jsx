import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Note extends Component {
  render() {
    const { note } = this.props;
    const title = note.title;
    const content = note.content;
    const rgb = note.rgb;
    const rgbstring = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

    return (
      <>
        <Icon name="sticky note" style={{ color: rgbstring }} />
        {title}
        {content}
      </>
    );
  }
}
export default Note;
//        style={{color: rgbstring}}
