import React from "react";
import { Toggler, FlexContent, FlexEditor } from "../../../components";

export default function Item({
  noteMap,
  activeNote, //editmode
  functions,
  isLoading,
  type,
  tagMap,
  noteIndex,
  ...rest
}) {
  const key = noteIndex;
  const { rgb, content, secondarycontent } = noteMap.get(key);

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
          secondarycontent={secondarycontent}
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
          secondarycontent={secondarycontent}
        />
      )}
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
}

function ItemFlexContent({
  functions,
  index,
  secondarycontent,
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
          secondarycontent ? "check square" : "square outline",
          () =>
            functions.submitNote({
              ...noteMap.get(index),
              secondarycontent: !secondarycontent,
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
