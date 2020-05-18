import React from "react";
import { Item } from "../../../components";

const flexName = { item: Item };

export default function Flex({ type, isInEditMode, ...rest }) {
  const FlexName = flexName[type];

  return <FlexName isInEditMode={isInEditMode} {...rest} />;
}
