import React, { useState } from "react";
import {
  TextArea,
  Icon,
  Button,
  Form,
  Dropdown,
  Segment,
} from "semantic-ui-react";
import { TagDropdown } from "../../implementations/Tag/TagDropdown";
import { NEW_INSTANCE_UUID, NO_INSTANCE_UUID } from "../../../API";
import OutsideCaller from "./OutsideCaller";

export default function FlexEditor({
  functions,
  note,
  tagMap,
  onSubmit,
  onDelete,
  setAsActiveTag,
  isLoading,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  rgb,
}) {
  const isPreexisting = note["UUID"] !== NEW_INSTANCE_UUID;
  const [tagUUIDs, setTagUUIDs] = useState(note.tagUUIDs || []);
  const [secondarycontent] = useState(note.secondarycontent || false);

  const [content, setContent] = useState(note.content);
  const [type, setType] = useState(note.type || type || "item"); //don't know if this will work

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      UUID: note.UUID,
      content,
      tagUUIDs,
      secondarycontent,
      type,
    });
  };
  rgb = rgb || { r: "FFF", g: "FFF", b: "FFF" };
  const rgbstring = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const border = `2px solid ${rgbstring}`;

  return (
    <OutsideCaller
      getIsModalOpen={() => functions.getIsModalOpen()}
      onOutsideClick={() => functions.setAsActiveNote(NO_INSTANCE_UUID)}
      exception="FlexContent"
    >
      <Segment
        style={{
          borderTop: borderTop && border,
          borderBottom: borderBottom && border,
          borderLeft: borderLeft && border,
          borderRight: borderRight && border,
        }}
      >
        <Form loading={isLoading.setAsActiveNote}>
          {/* <Dropdown
            value={type}
            onChange={(e, { value }) => setType(value)}
            options={[{ key: "item", text: "item", value: "item" }]}
          ></Dropdown> */}
          <TextArea
            name="content"
            defaultValue={content}
            placeholder="Enter content here..."
            onChange={(e, { value }) => setContent(value)}
          />
          <TagDropdown
            key={Math.random()}
            placeholder="Add tags to your note"
            fluid
            isLoading={isLoading}
            tagMap={tagMap}
            defaultValue={tagUUIDs}
            setTagUUIDs={setTagUUIDs}
            setAsActiveTag={setAsActiveTag}
          />
          <Button
            positive
            icon
            onClick={handleSubmit}
            loading={isLoading.submitNote}
          >
            <Icon name="save" />
            Save
          </Button>
          {isPreexisting && (
            <Button icon onClick={onDelete} loading={isLoading.deleteNote}>
              <Icon name="trash alternate" />
              Delete
            </Button>
          )}
        </Form>{" "}
      </Segment>
    </OutsideCaller>
  );
}
