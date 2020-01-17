import React from "react";
import List from "../List";
import { Icon } from "semantic-ui-react";

import FlexContainer from "../Flex/FlexContainer";

export default function TagList({
  tagMap,
  selectedTags,
  functions,
  operation
}) {
  return (
    <List
      subtitle={`Showing notes with ${
        selectedTags.size == 0 ? "no tags" : "..."
      }`}
    >
      {Array.from(tagMap.keys()).map((key, index) => (
        <FlexContainer
          rgb={{ r: 255, g: 255, b: 255 }}
          selectedRGB={tagMap.get(key).rgb}
          onClick={() => functions.toggleTag(key)}
          extraOptions={[["pencil", () => functions.setAsActiveTag(key)]]}
          isSelected={selectedTags.has(key)}
          key={key}
          operation={index > 0 && operation}
        >
          <>{tagMap.get(key).title}</>
        </FlexContainer>
      ))}
    </List>
  );
}
