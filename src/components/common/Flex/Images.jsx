import React, { useState } from "react";
import { List, Image } from "semantic-ui-react";
import FlexContent from "./FlexContent";
import FlexEditor from "./FlexEditor";

export default function Items({
  noteMap,
  activeNote,
  functions,
  isLoading,
  type,
  tagMap,
  images,
  items,
  ...rest
}) {
  return (
    <Image.Group>
      {images.map(key => (
        <FlexContent
          isSelected={activeNote.UUID === key}
          onClick={() => functions.setAsActiveNote(key)}
          {...rest}
          color={noteMap.get(key).color}
          type={type}
          rgb={noteMap.get(key).rgb}
        >
          <Image src={noteMap.get(key).content} size="medium" />
          <FlexEditor
            type={type}
            isLoading={isLoading}
            note={activeNote}
            tagMap={tagMap}
            onSubmit={functions.submitNote}
            onDelete={() => functions.deleteNote(activeNote["UUID"])}
          />
        </FlexContent>
      ))}
    </Image.Group>
  );
}
