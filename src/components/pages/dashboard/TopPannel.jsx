import React from "react";
import { Header, Segment, Image } from "semantic-ui-react";

export default function TopPannel({ fixed, activeItem, history }) {
  return (
    <Segment>
      <Header as="h3">
        <Image circular src="/images/logo.png" /> Sunrise Notes
      </Header>
    </Segment>
  );
}
