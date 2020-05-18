import React from "react";
import { Items } from "../../../components";

const flexName = { item: Items };

export default function Flex({ type, isInEditMode, ...rest }) {
  const FlexName = flexName[type];

  return <FlexName isInEditMode={isInEditMode} {...rest} />;
}
