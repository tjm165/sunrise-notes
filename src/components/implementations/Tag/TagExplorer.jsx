import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";

function TagExplorer({ tagMap, selectedTags, functions, operation }) {
  return (
    <>
      <span>
        Showing notes with {selectedTags.size == 0 ? "no tags" : "..."}
      </span>
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
  const [shouldHideOptions, hideOptions] = useState(true);

  return (
    <Menu.Item
      style={{ backgroundColor: isSelected ? rgbstring : "#fff" }}
      onClick={() => functions.toggleTag(UUID)}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
    >
      {operation && (
        <strong>{operation == "intersection" ? "and" : "or"} </strong>
      )}
      {title}

      <Icon
        name={shouldHideOptions || "pencil"}
        onClick={event => {
          event.stopPropagation();
          functions.setAsActiveTag(UUID);
        }}
      />
    </Menu.Item>
  );
}

export default TagExplorer;
