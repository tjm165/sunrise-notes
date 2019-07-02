import React from "react";
import { Icon } from "semantic-ui-react";

function TagSegment({ rgb, text }) {
  const rgbstring = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

  return (
    <>
      <Icon name="tag" style={{ color: rgbstring }} />
      {text}
    </>
  );
}

export default TagSegment;
