import React from "react";
import { Header } from "semantic-ui-react";

export default function NavBar({ headerText, text, children, textAlign }) {
  return (
    <>
      <Header as="h4" style={{ fontSize: "2em", textAlign: textAlign }}>
        {headerText}
      </Header>
      <p style={{ fontSize: "1.33em" }}>{text}</p>
      {children}
    </>
  );
}
