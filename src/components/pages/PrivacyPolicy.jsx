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

const PrivacyPolicy = () => {
  return (
    <Desktop activeItem="Privacy Policy">
      <Paragraph headerText="User Data">
        <Container>
          This app does not take any user data from any sources that the user
          has not explicity entered themselves. All data is stored on
          SunriseNotes databases which are hosted through Amazon Web Services.
        </Container>
      </Paragraph>
      <Paragraph headerText="User Passwords">
        <Container>
          User's passwords are hashed any managed by Amazon Web Service's
          Cognito, or Google.
        </Container>
      </Paragraph>
      <Paragraph headerText="Authentication and Authorization">
        <Container>
          All authentication is managed through Amazon Web Service's Cognito.
          All authorization is implemented through proprietary code which can be
          accessed{" "}
          <a href="https://github.com/tjm165/sunrise-notes/tree/master/lambda-functions/NotesApp-Actions">
            here
          </a>
          .{" "}
        </Container>
      </Paragraph>

      <Paragraph headerText="Encryption">
        <Container>
          This web application is a side project. I am learning to encrypt your
          data and I will update the page when it has been accomplished.
        </Container>
      </Paragraph>
      <Paragraph>
        <Container>Last updated on January 28, 2020.</Container>
      </Paragraph>
    </Desktop>
  );
};

export default withRouter(PrivacyPolicy);
