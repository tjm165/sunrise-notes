import React from "react";
import { Divider as Div } from "semantic-ui-react";

export default function Divider({ children }) {
  return (
    <Div
      as="h4"
      className="header"
      style={{ margin: "3em 0em", textTransform: "uppercase" }}
    >
      {children}
    </Div>
  );
}
