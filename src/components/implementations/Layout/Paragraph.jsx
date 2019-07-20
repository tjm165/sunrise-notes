import React from "react";
import { Header } from "semantic-ui-react";

export default function NavBar({ headerText, text, children }) {
  return (
    <>
      <Header as="h3" style={{ fontSize: "2em" }}>
        {headerText}
      </Header>
      <p style={{ fontSize: "1.33em" }}>{text}</p>
      {children}
    </>
  );
}
