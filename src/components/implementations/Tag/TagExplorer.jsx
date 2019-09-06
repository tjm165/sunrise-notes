import React, { useEffect } from "react";
import { Menu } from "semantic-ui-react";

function TagExplorer({ tagMap, selectedTags, functions }) {
  return (
    <Menu pointing vertical fluid>
      {Array.from(tagMap.keys()).map((key, index) => (
        <Tag
          {...tagMap.get(key)}
          isSelected={selectedTags.has(key)}
          functions={functions}
          key={index}
        />
      ))}
    </Menu>
  );
}

function Tag({ title, rgb, UUID, isSelected, functions }) {
  const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;

  return (
    <>
      <Menu.Item
        style={{ backgroundColor: isSelected ? rgbstring : "#fff" }}
        onClick={() => functions.toggleTag(UUID)}
      >
        {title}
      </Menu.Item>
    </>
  );
}

export default TagExplorer;
