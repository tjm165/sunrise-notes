import React, { useEffect } from "react";
import { Menu } from "semantic-ui-react";
function TagExplorer({ tagMap, selectedTags, functions }) {
  return (
    <Menu pointing vertical fluid>
      {Array.from(tagMap.keys()).map((key, index) => (
        <Tag {...tagMap.get(key)} functions={functions} />
      ))}
    </Menu>
  );
}

function Tag({ title, rgb, UUID, functions }) {
  return (
    <Menu.Item onClick={() => functions.toggleTag(UUID)}>
      {title} {rgb.r}
    </Menu.Item>
  );
}

export default TagExplorer;
