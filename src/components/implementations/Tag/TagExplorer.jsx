import React, { useEffect } from "react";
import { Menu, Dropdown } from "semantic-ui-react";

function TagExplorer({ tagMap, selectedTags, functions, operation }) {
  return (
    <>
      <span>Show me notes in</span>
      <Menu pointing vertical fluid>
        {Array.from(tagMap.keys()).map((key, index) => (
          <Tag
            {...tagMap.get(key)}
            isSelected={selectedTags.has(key)}
            functions={functions}
            key={index}
            operation={index > 0 && operation}
          />
        ))}
      </Menu>
    </>
  );
}

function Tag({ title, rgb, UUID, isSelected, functions, operation }) {
  const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;

  return (
    <>
      <Menu.Item
        style={{ backgroundColor: isSelected ? rgbstring : "#fff" }}
        onClick={() => functions.toggleTag(UUID)}
      >
        {operation && (
          <strong>{operation == "intersection" ? "and" : "or"} </strong>
        )}
        {title}
      </Menu.Item>
    </>
  );
}

export default TagExplorer;
