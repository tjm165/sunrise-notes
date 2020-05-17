import React from "react";
import { List, FlexContent } from "../../../components";

export default function TagList({
  tagMap,
  selectedTags,
  functions,
  operation,
}) {
  return (
    <List
      subtitle={`Showing notes with ${
        selectedTags.size == 0 ? "no tags" : "..."
      }`}
    >
      {Array.from(tagMap.keys()).map((key, index) => {
        const isSelected = selectedTags.has(key);

        return (
          <FlexContent
            fade={!isSelected}
            fadeWithColor={isSelected}
            rgb={tagMap.get(key).rgb}
            borderLeft
            onClick={() => functions.toggleTag(key)}
            rightExtraOptions={[
              ["pencil", () => functions.setAsActiveTag(key)],
            ]}
            isSelected={isSelected}
            key={key}
            operation={index > 0 && operation}
            shouldColorWhenSelected
          >
            <>{tagMap.get(key).title}</>
          </FlexContent>
        );
      })}
    </List>
  );
}
