import React from "react";
import List from "../List";
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
          onClick={() => functions.toggleTag(key)}
          extraOptions={[["pencil", () => functions.setAsActiveTag(key)]]}
          isSelected={selectedTags.has(key)}
          key={key}
          operation={index > 0 && operation}
        >
          {tagMap.get(key).title}
        </FlexContainer>
      ))}
    </List>
  );
}
