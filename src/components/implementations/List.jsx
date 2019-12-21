import React, { useState } from "react";
import { Menu, Icon, Segment, Loader } from "semantic-ui-react";

export default function List({ children, subtitle, title, isListLoading }) {
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h5>{subtitle}</h5>}

      {isListLoading ? (
        <Loader active={isListLoading} inline="centered" />
      ) : (
        <Menu pointing vertical fluid>
          {children}
        </Menu>
      )}
    </>
  );
}
