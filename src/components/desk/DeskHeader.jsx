import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class DeskHeader extends Component {
  render() {
    const { signIn } = this.props;

    return (
      <Container>
        Desk Header
        <Button onClick={signIn}>AWS</Button>
      </Container>
    );
  }
}

export default DeskHeader;
