import React from "react";
import { Container, Header } from "semantic-ui-react";

function Heading({ className, mobile, h1, h2, misc }) {
  return (
    <Container text className={className}>
      <Header
        as="h1"
        style={{
          fontSize: mobile ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1.5em" : "3em"
        }}
      >
        {h1}
      </Header>

      <Header
        as="h2"
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      >
        {h2}
      </Header>
      {misc}
    </Container>
  );
}

export default Heading;
