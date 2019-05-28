import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class DeskHeader extends Component {
  render() {
    const { getUser } = this.props;

    return (
      <Container>
        Desk Header
        <Button onClick={getUser}>AWS</Button>
      </Container>
    );
  }
}

export default DeskHeader;
