import React, { useState } from "react";
import {
  Grid,
  Image,
  Header,
  Button,
  Icon,
  Container
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import Desktop from "../implementations/Layout/Desktop";
import Paragraph from "../implementations/Layout/Paragraph";

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
