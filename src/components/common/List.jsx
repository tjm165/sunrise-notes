import React, { useState } from "react";
import { Segment, Icon, Loader } from "semantic-ui-react";

export default function List({
  stacked,
  children,
  subtitle,
  title,
  isListLoading
}) {
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h5>{subtitle}</h5>}

      {isListLoading ? (
        <Loader active={isListLoading} inline="centered" />
      ) : (
        <Segment.Group
          stacked={children.length > 1 && stacked}
          pointing
          vertical
          fluid
        >
          {children}
        </Segment.Group>
      )}
    </>
  );
}
