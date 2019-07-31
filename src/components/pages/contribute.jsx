import React, { useState } from "react";
import {
  Grid,
  Image,
  Header,
  Button,
  Icon,
  Container
} from "semantic-ui-react";
import Desktop from "../implementations/Layout/Desktop";
import Paragraph from "../implementations/Layout/Paragraph";

export default function Contribute() {
  return (
    <Desktop>
      <Paragraph headerText="All Help Is Appreciated!">
        <Grid columns="equal">
          <Grid.Column>
            <Image size="medium" src="/images/contribute.png" />
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Header as="h2">Here's what you need to know</Header>
              Whether you're a beginner or a master at coding, you have
              potential to help!
            </Container>
          </Grid.Column>
        </Grid>
      </Paragraph>
      <Paragraph headerText="Clone the Repository">
        <Container>
          You're moving in the right direction, you'll be making pull requests
          in no time!
        </Container>
        <Button
          primary
          href="https://github.com/tjm165/sunrise-notes"
          target="_blank"
        >
          <Icon name="github" />
          Github
        </Button>
      </Paragraph>
      <Paragraph headerText="What Resources Do You Use?">
        <Container>
          The main resources used for this application are AWS, Google Cloud
          Python Semantic UI and React. However, this certainly does not limit
          the selection of future tools when reaching our full potential.
        </Container>
      </Paragraph>
    </Desktop>
  );
}
