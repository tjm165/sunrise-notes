import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import Heading from "../implementations/Layout/Heading";
import Desktop from "../implementations/Layout/Desktop";
import Divider from "../implementations/Layout/Divider";
import Paragraph from "../implementations/Layout/Paragraph";

const HomepageHeading = () => (
  <Heading
    h1="Created by students for students"
    h2="You've never used note-taking like this before."
    misc={
      <Link to="/signup">
        <Button primary size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    }
  />
);

const LandingPageLayout = () => (
  <Desktop activeItem="Home" heading={<HomepageHeading />}>
    <Paragraph headerText="Multi-Tag Search" text="It's really cool!">
      <Button as="a" size="large">
        Read More
      </Button>
    </Paragraph>

    <Divider />

    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
    <Paragraph
      headerText="Auto-Colored Notes"
      text="t's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolIt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly coolt's reallllly cool"
    />
  </Desktop>
);
export default LandingPageLayout;
