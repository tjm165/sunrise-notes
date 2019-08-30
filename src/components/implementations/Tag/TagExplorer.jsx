import React, { useEffect } from "react";
import { Menu } from "semantic-ui-react";
function TagExplorer({ tagMap, selectedTags, functions }) {
  return (
    <Menu pointing vertical fluid>
      {Array.from(tagMap.keys()).map((key, index) => (
        <Menu.Item>{tagMap.get(key).title}</Menu.Item>
      ))}
    </Menu>
  );
}

export default TagExplorer;
