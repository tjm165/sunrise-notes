import React from "react";
import List from "../List";
import { Icon } from "semantic-ui-react";

import FlexContent from "../Flex/FlexContent";

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
        <FlexContent
          fade
          rgb={tagMap.get(key).rgb}
          borderLeft
          onClick={() => functions.toggleTag(key)}
          rightExtraOptions={[["pencil", () => functions.setAsActiveTag(key)]]}
          isSelected={selectedTags.has(key)}
          key={key}
          operation={index > 0 && operation}
          shouldColorWhenSelected
        >
          <>{tagMap.get(key).title}</>
        </FlexContent>
      ))}
    </List>
  );
}
