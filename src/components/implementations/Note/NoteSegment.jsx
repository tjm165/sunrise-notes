import React, { useState } from "react";
import { Icon, Segment, Popup, Grid, Button, Menu } from "semantic-ui-react";

function NoteSegment({ note, onEdit, onDelete }) {
  const title = note.title;
  const content = note.content;
  const rgb = note.rgb;
  const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;
  const [shouldHideOptions, hideOptions] = useState(true);

  return (
    <Menu.Item
      style={{ backgroundColor: rgbstring }}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
    >
      {title}
      <Icon
        name={shouldHideOptions || "pencil"}
        onClick={event => {
          event.stopPropagation();
          // functions.setAsActiveTag(UUID);
        }}
      />
    </Menu.Item>
  );
}
export default NoteSegment;
