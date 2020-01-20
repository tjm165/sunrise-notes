import React, { useState } from "react";
import { List, Icon } from "semantic-ui-react";
import FlexContent from "./FlexContent";
import FlexEditor from "./FlexEditor";
import Toggler from "./Toggler";

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
          <Toggler key={key} indexToShow={activeNote.UUID === key ? 1 : 0}>
            <FlexContent
              onClick={() => functions.setAsActiveNote(key)}
              {...rest}
              type={type}
              rgb={rgb}
              borderTop
              fade
              shouldColorOptions
              shouldNeverHideOptions
              leftExtraOptions={[
                [
                  secondaryContent ? "check square" : "square outline",
                  () =>
                    functions.submitNote({
                      ...noteMap.get(key),
                      secondaryContent: !secondaryContent
                    })
                ]
              ]}
            >
              <>{content}</>
            </FlexContent>
            <FlexEditor
              rgb={rgb}
              borderTop
              functions={functions}
              type={type}
              isLoading={isLoading}
              note={activeNote}
              tagMap={tagMap}
              onSubmit={functions.submitNote}
              onDelete={() => functions.deleteNote(activeNote["UUID"])}
              setAsActiveTag={functions.setAsActiveTag}
            />
          </Toggler>
        );
      })}
    </List>
  );
}
