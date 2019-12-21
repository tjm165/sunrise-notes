import React, { useState } from "react";
import List, { Entry } from "../List/List";
import { Menu, Icon } from "semantic-ui-react";

export default function TagExplorer({
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
        <Entry
          onClick={() => functions.toggleTag(key)}
          extraOptions={[["pencil", () => functions.setAsActiveTag(key)]]}
          isSelected={selectedTags.has(key)}
          key={key}
          operation={index > 0 && operation}
        >
          {tagMap.get(key).title}
        </Entry>
      ))}
    </List>
  );
}
