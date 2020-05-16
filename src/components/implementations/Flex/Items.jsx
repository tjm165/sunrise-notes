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
      {items.map((key) => {
        const { rgb, content, secondaryContent } = noteMap.get(key);
        const rgbstring = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

        return (
          <Toggler key={key} indexToShow={activeNote.UUID === key ? 1 : 0}>
            {content.startsWith("http") ? (
              <LinkFlexContent
                key={key}
                functions={functions}
                index={key}
                type={"item"}
                rgb={rgb}
                noteMap={noteMap}
                content={content}
                secondaryContent={secondaryContent}
              />
            ) : (
              <ItemFlexContent
                key={key}
                functions={functions}
                index={key}
                type={"item"}
                rgb={rgb}
                noteMap={noteMap}
                content={content}
                secondaryContent={secondaryContent}
              />
            )}

            {/* <ItemFlexContent
              key={key}
              functions={functions}
              index={key}
              type={content.startsWith("http") ? "link" : "item"}
              rgb={rgb}
              noteMap={noteMap}
              content={content}
              secondaryContent={secondaryContent}
            /> */}
            {/* <FlexContent
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
            </FlexContent> */}
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

function ItemFlexContent({
  functions,
  index,
  secondaryContent,
  noteMap,
  content,

  ...rest
}) {
  return (
    <FlexContent
      key={index}
      onClick={() => functions.setAsActiveNote(index)}
      {...rest}
      borderTop
      fade
      shouldColorOptions
      shouldNeverHideOptions
      leftExtraOptions={[
        [
          secondaryContent ? "check square" : "square outline",
          () =>
            functions.submitNote({
              ...noteMap.get(index),
              secondaryContent: !secondaryContent,
            }),
        ],
      ]}
    >
      <>{content}</>
    </FlexContent>
  );
}

function LinkFlexContent({ functions, index, noteMap, content, ...rest }) {
  return (
    <FlexContent
      key={index}
      onClick={() => functions.setAsActiveNote(index)}
      {...rest}
      borderTop
      fade
      shouldColorOptions
      shouldNeverHideOptions
      leftExtraOptions={[
        [
          "linkify",
          () =>
            //I think this is where the link should go
            window.open(content, "_blank"),
        ],
      ]}
    >
      <>{content}</>
    </FlexContent>
  );
}
