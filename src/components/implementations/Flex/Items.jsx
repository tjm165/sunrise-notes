import React, { useState } from "react";
import { List, Icon } from "semantic-ui-react";
import FlexContainer from "./FlexContainer";
import FlexEditor from "./FlexEditor";

export default function Items({
  noteMap,
  activeNote,
  functions,
  isLoading,
  type,
  tagMap,
  notes,
  items,
  ...rest
}) {
  return (
    <List>
      {items.map(key => {
        const { rgb, content, secondaryContent } = noteMap.get(key);
        const rgbstring = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

        return (
          <FlexContainer
            isSelected={activeNote.UUID === key}
            onClick={() => functions.setAsActiveNote(key)}
            {...rest}
            type={type}
            rgb={rgb}
            key={key}
            borderTop
          >
            <>
              <span style={{ float: "left" }}>
                <Icon
                  style={{ color: rgbstring }}
                  onClick={() =>
                    functions.submitNote({
                      ...noteMap.get(key),
                      secondaryContent: !secondaryContent
                    })
                  }
                  name={secondaryContent ? "check square" : "square outline"}
                ></Icon>
              </span>
              {content}
            </>
            <FlexEditor
              type={type}
              isLoading={isLoading}
              note={activeNote}
              tagMap={tagMap}
              onSubmit={functions.submitNote}
              onDelete={() => functions.deleteNote(activeNote["UUID"])}
              setAsActiveTag={functions.setAsActiveTag}
            />
          </FlexContainer>
        );
      })}
    </List>
  );
}
