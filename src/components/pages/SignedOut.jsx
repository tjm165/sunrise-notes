import React from "react";
import { Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Desktop, Paragraph } from "../../components";

const SignedOut = () => {
  return (
    <Desktop>
      <Paragraph headerText="See You Soon!">
        <Container>
          Thanks for coming to Sunrise Notes, we hope to see you again soon!
        </Container>
      </Paragraph>
    </Desktop>
  );
};

export default withRouter(SignedOut);
